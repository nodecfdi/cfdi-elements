import type Structure from './structure.js';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import Dictionary from './dictionary.js';
import Specifications from './specifications.js';
import { toSnakeCase } from './string_utils.js';

export default class ElementsMarker {
  private readonly _specs: Specifications;

  private readonly _outputDir: string;

  private readonly _templates: Record<string, string> = {};

  private readonly _classAttributes = new Map<string, string[]>();

  public constructor(specs: Specifications, outputDir: string) {
    this._specs = specs;
    this._outputDir = outputDir;

    mkdirSync(this._outputDir, { recursive: true });
  }

  public write(): void {
    this._classAttributes.clear();
    this.collectClassAttributes(this._specs.getStructure());
    this.createElement(this._specs.getStructure(), this._specs.getDictionary(), true);
  }

  public createElement(structure: Structure, dictionary: Dictionary, isRoot = false): void {
    const prefix = dictionary.get('#prefix#');
    const className = structure.getName();
    const ownAttributes = this._classAttributes.get(className) ?? [];
    const attributesType = this.formatAttributesType(className, ownAttributes);
    const elementGenerics = ownAttributes.length > 0 ? `<${className}Attributes>` : '';

    let finalDictionary = dictionary
      .with('#element-name#', structure.getElementName())
      .with('#class-name#', className)
      .with('#attributes-type#', attributesType)
      .with('#element-generics#', elementGenerics);

    const sectionsContent: string[] = [];
    const cfdiCoreTypes = new Set<string>();
    const valueImports = new Map<string, string>();
    const typeDefaultImports = new Map<string, string>();
    const typeNamedImports = new Map<string, Set<string>>();
    const orderElements = structure.getChildrenNames(`${prefix}:`);

    const addNamedTypeImport = (modulePath: string, typeName: string): void => {
      const existing = typeNamedImports.get(modulePath) ?? new Set<string>();
      existing.add(typeName);
      typeNamedImports.set(modulePath, existing);
    };

    if (orderElements.length > 1) {
      sectionsContent.push(
        this.template(
          'get_children_order',
          new Dictionary({ '#elements#': this.elementsToString(orderElements) }),
        ),
      );
    }

    if (isRoot) {
      sectionsContent.push(this.template('get_fixed_attributes', finalDictionary));
    }

    for (const child of structure) {
      const childName = child.getName();
      const childModule = `./${toSnakeCase(childName)}`;
      const childAttrs = this._classAttributes.get(childName) ?? [];
      const childAttributesType = childAttrs.length > 0
        ? `AttributesRecord<${childName}Attributes>`
        : 'AttributesRecord';

      const childTemplate = child.isMultiple()
        ? 'child_multiple'
        : (child.isSingleAddChild()
            ? 'child_single_add'
            : 'child_single');

      sectionsContent.push(
        this.template(
          childTemplate,
          new Dictionary({
            '#child-name#': childName,
            '#child-method-name#': child.getMethodName(),
            '#child-attributes-type#': childAttributesType,
          }),
        ),
      );

      valueImports.set(childModule, childName);

      if (child.isSingleAddChild()) {
        cfdiCoreTypes.add('XmlNodeInterface');
      } else {
        cfdiCoreTypes.add('AttributesRecord');
        if (childAttrs.length > 0) {
          addNamedTypeImport(childModule, `${childName}Attributes`);
        }
      }

      this.createElement(child, finalDictionary);
    }

    for (const shortcut of structure.getShortcuts()) {
      const targetName = shortcut.target;
      const targetModule = `./${toSnakeCase(targetName)}`;
      const targetAttrs = this._classAttributes.get(targetName) ?? [];
      const targetAttributesType = targetAttrs.length > 0
        ? `AttributesRecord<${targetName}Attributes>`
        : 'AttributesRecord';

      const getterChain = shortcut.path.map((segment) => `get${segment}()`).join('.');
      const shortcutDictionary = new Dictionary({
        '#target#': targetName,
        '#getter-chain#': getterChain,
        '#target-attributes-type#': targetAttributesType,
      });

      sectionsContent.push(this.template('shortcut_add', shortcutDictionary));
      if (shortcut.multi !== false) {
        sectionsContent.push(this.template('shortcut_multi', shortcutDictionary));
      }

      cfdiCoreTypes.add('AttributesRecord');
      if (targetAttrs.length > 0) {
        addNamedTypeImport(targetModule, `${targetName}Attributes`);
      }

      if (!valueImports.has(targetModule)) {
        typeDefaultImports.set(targetModule, targetName);
      }
    }

    const importLines: string[] = [];
    if (cfdiCoreTypes.size > 0) {
      const sorted = [...cfdiCoreTypes].toSorted((a, b) => a.localeCompare(b));
      importLines.push(`import type { ${sorted.join(', ')} } from '@nodecfdi/cfdi-core/types';`);
    }

    for (const [modulePath, defaultType] of typeDefaultImports) {
      importLines.push(`import type ${defaultType} from '${modulePath}';`);
    }

    for (const [modulePath, named] of typeNamedImports) {
      const sortedNamed = [...named].toSorted((a, b) => a.localeCompare(b));
      importLines.push(`import type { ${sortedNamed.join(', ')} } from '${modulePath}';`);
    }

    for (const [modulePath, valueName] of valueImports) {
      importLines.push(`import ${valueName} from '${modulePath}';`);
    }

    finalDictionary = finalDictionary.with('#sections#', sectionsContent.join(''));
    finalDictionary = finalDictionary.with('#imports#', importLines.join('\n'));

    const contents = this.template('element', finalDictionary);
    const outputFile = this.buildOutputFile(className);
    writeFileSync(outputFile, contents);
  }

  public static make(specFile: string, outputDir: string): ElementsMarker {
    return new ElementsMarker(Specifications.makeFromFile(specFile), outputDir);
  }

  private collectClassAttributes(structure: Structure): void {
    const className = structure.getName();
    const existing = this._classAttributes.get(className) ?? [];
    for (const attr of structure.getAttributes()) {
      if (!existing.includes(attr)) {
        existing.push(attr);
      }
    }

    this._classAttributes.set(className, existing);
    for (const child of structure) {
      this.collectClassAttributes(child);
    }
  }

  private formatAttributesType(className: string, attributes: string[]): string {
    if (attributes.length === 0) {
      return '';
    }

    const quoted = attributes.map((attr) => `'${attr}'`);
    if (quoted.length <= 4) {
      return `\nexport type ${className}Attributes = ${quoted.join(' | ')};\n`;
    }

    const lines = quoted.map((item) => `  | ${item}`).join('\n');

    return `\nexport type ${className}Attributes =\n${lines};\n`;
  }

  private template(templateName: string, dictionary: Dictionary): string {
    if (!Object.hasOwn(this._templates, templateName)) {
      const fileName = path.join(import.meta.dirname, 'templates', `${templateName}.stub`);
      this._templates[templateName] = readFileSync(fileName).toString();
    }

    return dictionary.interpolate(this._templates[templateName]);
  }

  private buildOutputFile(elementName: string): string {
    const snakeCaseName = toSnakeCase(elementName);

    return path.join(this._outputDir, `${snakeCaseName}.ts`);
  }

  private elementsToString(list: string[]): string {
    const parts: string[] = Array.from(list, (value) => `'${value}'`);

    return `[\n${parts.join(',\n')}]`;
  }
}
