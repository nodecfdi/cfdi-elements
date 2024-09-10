import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { getDirname } from '@poppinss/utils';
import string from '@poppinss/utils/string';
import Dictionary from './dictionary.js';
import Specifications from './specifications.js';
import type Structure from './structure.js';

export default class ElementsMarker {
  public static make(specFile: string, outputDir: string): ElementsMarker {
    return new ElementsMarker(Specifications.makeFromFile(specFile), outputDir);
  }

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
    let finalDictionary = dictionary.with('#element-name#', structure.getName());
    const sectionsContent: string[] = [];
    const imports: string[] = [];
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
        : child.isSingleAddChild()
          ? 'child_single_add'
          : 'child_single';
      sectionsContent.push(
        this.template(childTemplate, new Dictionary({ '#child-name#': child.getName() })),
      );

      imports.push(
        `import ${child.getName()} from '#${this._outputDir}${string.snakeCase(child.getName())}';`,
      );

      if (child.isSingleAddChild()) {
        imports.push("import { type XmlNodeInterface } from '@nodecfdi/cfdi-core/types';");
      }

      this.createElement(child, finalDictionary);
    }

    finalDictionary = finalDictionary.with('#sections#', sectionsContent.join(''));
    finalDictionary = finalDictionary.with('#imports#', imports.join('\n'));

    const contents = this.template('element', finalDictionary);
    const outputFile = this.buildOutputFile(structure.getName());
    writeFileSync(outputFile, contents);
  }

  private template(templateName: string, dictionary: Dictionary): string {
    if (!(templateName in this._templates)) {
      const fileName = path.join(getDirname(import.meta.url), 'templates', `${templateName}.stub`);
      this._templates[templateName] = readFileSync(fileName).toString();
    }

    return dictionary.interpolate(this._templates[templateName]);
  }

  private buildOutputFile(elementName: string): string {
    const snakeCaseName = string.snakeCase(elementName);

    return path.join(this._outputDir, `${snakeCaseName}.ts`);
  }

  private elementsToString(list: string[]): string {
    const parts: string[] = [];

    for (const value of list) {
      parts.push(`'${value}'`);
    }

    return `[\n${parts.join(',\n')}]`;
  }
}
