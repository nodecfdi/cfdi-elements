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

  public constructor(specs: Specifications, outputDir: string) {
    this._specs = specs;
    this._outputDir = outputDir;

    mkdirSync(this._outputDir, { recursive: true });
  }

  public write(): void {
    this.createElement(this._specs.getStructure(), this._specs.getDictionary(), true);
  }

  public createElement(structure: Structure, dictionary: Dictionary, isRoot = false): void {
    const prefix = dictionary.get('#prefix#');
    let finalDictionary = dictionary
      .with('#element-name#', structure.getElementName())
      .with('#class-name#', structure.getName());
    const sectionsContent: string[] = [];
    const imports = new Set<string>();
    const importedClasses = new Set<string>();
    const orderElements = structure.getChildrenNames(`${prefix}:`);

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
      const childTemplate = child.isMultiple()
        ? 'child_multiple'
        : (child.isSingleAddChild()
            ? 'child_single_add'
            : 'child_single');
      sectionsContent.push(
        this.template(
          childTemplate,
          new Dictionary({
            '#child-name#': child.getName(),
            '#child-method-name#': child.getMethodName(),
          }),
        ),
      );

      imports.add(
        `import ${child.getName()} from './${toSnakeCase(child.getName())}';`,
      );
      importedClasses.add(child.getName());

      if (child.isSingleAddChild()) {
        imports.add("import type { XmlNodeInterface } from '@nodecfdi/cfdi-core/types';");
      }

      this.createElement(child, finalDictionary);
    }

    for (const shortcut of structure.getShortcuts()) {
      const getterChain = shortcut.path.map((segment) => `get${segment}()`).join('.');
      const shortcutDictionary = new Dictionary({
        '#target#': shortcut.target,
        '#getter-chain#': getterChain,
      });

      sectionsContent.push(this.template('shortcut_add', shortcutDictionary));
      if (shortcut.multi !== false) {
        sectionsContent.push(this.template('shortcut_multi', shortcutDictionary));
      }

      if (importedClasses.has(shortcut.target)) {
        continue;
      }

      imports.add(
        `import type ${shortcut.target} from './${toSnakeCase(shortcut.target)}';`,
      );
      importedClasses.add(shortcut.target);
    }

    finalDictionary = finalDictionary.with('#sections#', sectionsContent.join(''));
    finalDictionary = finalDictionary.with('#imports#', [...imports].join('\n'));

    const contents = this.template('element', finalDictionary);
    const outputFile = this.buildOutputFile(structure.getName());
    writeFileSync(outputFile, contents);
  }

  public static make(specFile: string, outputDir: string): ElementsMarker {
    return new ElementsMarker(Specifications.makeFromFile(specFile), outputDir);
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
