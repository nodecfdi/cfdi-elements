import type Structure from './structure.js';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { specKeyFromFile } from './cli_utils.js';
import Specifications from './specifications.js';
import { snakeToCamelCase, toSnakeCase, toWords } from './string_utils.js';

export interface TestsMakerOptions {
  specKey?: string;
  srcDir?: string;
  force?: boolean;
}

export default class TestsMaker {
  private readonly _specs: Specifications;

  private readonly _outputFile: string;

  private readonly _specKey: string;

  private readonly _srcDir: string;

  private readonly _force: boolean;

  public constructor(specs: Specifications, outputPath: string, options: TestsMakerOptions = {}) {
    this._specs = specs;
    const rootFileName = `${toSnakeCase(specs.getStructure().getName())}.test.ts`;
    const isTestFile = outputPath.endsWith('.test.ts') || outputPath.endsWith('.spec.ts');
    this._outputFile = isTestFile ? outputPath : path.join(outputPath, rootFileName);
    this._specKey = options.specKey ?? path.basename(path.dirname(this._outputFile));
    this._srcDir = options.srcDir ?? path.join('src', this._specKey);
    this._force = options.force ?? false;
  }

  public getOutputFile(): string {
    return this._outputFile;
  }

  public write(): boolean {
    if (existsSync(this._outputFile) && !this._force) {
      return false;
    }

    mkdirSync(path.dirname(this._outputFile), { recursive: true });

    const root = this._specs.getStructure();
    const dictionary = this._specs.getDictionary();
    const prefix = dictionary.get('#prefix#');

    const visitedClasses = new Set<string>();
    const orderedStructures: { structure: Structure; isRoot: boolean }[] = [];

    const collect = (node: Structure, isRoot: boolean): void => {
      const className = node.getName();
      if (!visitedClasses.has(className)) {
        visitedClasses.add(className);
        orderedStructures.push({ structure: node, isRoot });
      }

      for (const child of node) {
        collect(child, false);
      }
    };

    collect(root, true);

    const testDir = path.dirname(path.resolve(this._outputFile));
    const absSrcDir = path.resolve(this._srcDir);
    const relativeSrcBase = path.relative(testDir, absSrcDir).replaceAll('\\', '/');
    const normalizedSrcBase = relativeSrcBase.startsWith('.') ? relativeSrcBase : `./${relativeSrcBase}`;

    const sortedImports = [...visitedClasses]
      .map((className) => ({
        className,
        fileName: toSnakeCase(className),
      }))
      .toSorted((a, b) => a.fileName.localeCompare(b.fileName));

    const importLines = [
      'import { describe, expect, test } from \'vitest\';',
      ...sortedImports.map(
        ({ className, fileName }) => `import { ${className} } from '${normalizedSrcBase}/${fileName}';`,
      ),
    ];

    const testBlocks: string[] = [];
    for (const { structure, isRoot } of orderedStructures) {
      testBlocks.push(...this.buildNodeTests(structure, prefix, isRoot));
    }

    const describeName = snakeToCamelCase(this._specKey);
    const content = [
      importLines.join('\n'),
      '',
      `describe('${describeName}', () => {`,
      testBlocks.join('\n\n'),
      '});',
      '',
    ].join('\n');

    writeFileSync(this._outputFile, content, 'utf8');

    return true;
  }

  public static make(specFile: string, outputPath?: string, options: TestsMakerOptions = {}): TestsMaker {
    const specKey = options.specKey ?? specKeyFromFile(specFile);
    const resolvedOutput = outputPath ?? path.join('tests', 'unit', specKey);

    return new TestsMaker(Specifications.makeFromFile(specFile), resolvedOutput, {
      ...options,
      specKey,
    });
  }

  private buildNodeTests(structure: Structure, prefix: string, isRoot: boolean): string[] {
    const className = structure.getName();
    const elementXmlName = `${prefix}:${structure.getElementName()}`;
    const orderElements = structure.getChildrenNames(`${prefix}:`);
    const children = structure.getChildren();
    const needsAssert = children.length > 0;

    const lines: string[] = [
      `    const element = new ${className}();`,
      `    expect(element).toElementHasName('${elementXmlName}');`,
    ];

    if (orderElements.length > 1) {
      const items = orderElements.map((item) => `      '${item}',`).join('\n');
      lines.push(`    expect(element).toElementHasOrder([\n${items}\n    ]);`);
    }

    if (isRoot) {
      const dictionary = this._specs.getDictionary();
      const xmlNamespace = dictionary.get('#xml-namespace#');
      const xmlSchemaLocation = dictionary.get('#xml-schemalocation#');
      const versionAttribute = dictionary.get('#version-attribute#');
      const versionValue = dictionary.get('#version-value#');

      lines.push(
        '    expect(element).toElementHasFixedAttributes({',
        `      'xmlns:${prefix}': '${xmlNamespace}',`,
        '      \'xmlns:xsi\': \'http://www.w3.org/2001/XMLSchema-instance\',',
        `      'xsi:schemaLocation': '${xmlNamespace} ${xmlSchemaLocation}',`,
        `      '${versionAttribute}': '${versionValue}',`,
        '    });',
      );
    }

    for (const child of children) {
      const childClass = child.getName();
      const childMethodName = child.getMethodName();

      if (child.isMultiple()) {
        if (childMethodName === childClass) {
          lines.push(`    assert.toElementHasChildMultiple(element, ${childClass});`);
        } else {
          lines.push(
            `    assert.toElementHasChildMultiple(element, ${childClass}, '${childMethodName}');`,
          );
        }
      } else if (child.isSingleAddChild()) {
        lines.push(`    assert.toElementHasChildSingleAddChild(element, ${childClass});`);
      } else if (childMethodName === childClass) {
        lines.push(`    assert.toElementHasChildSingle(element, ${childClass});`);
      } else {
        lines.push(
          `    assert.toElementHasChildSingle(element, ${childClass}, 'get${childMethodName}', 'add${childMethodName}');`,
        );
      }
    }

    const testHeader = needsAssert
      ? `  test('${toWords(className)}', ({ assert }) => {`
      : `  test('${toWords(className)}', () => {`;

    const blocks = [`${testHeader}\n${lines.join('\n')}\n  });`];

    const shortcuts = structure.getShortcuts();
    if (shortcuts.length > 0) {
      const shortcutChecks: string[] = [`    const element = new ${className}();`];
      for (const shortcut of shortcuts) {
        shortcutChecks.push(`    expect(element).toHaveProperty('add${shortcut.target}');`);
        if (shortcut.multi !== false) {
          shortcutChecks.push(`    expect(element).toHaveProperty('multi${shortcut.target}');`);
        }
      }

      blocks.push(
        `  test('${toWords(className)} shortcuts', () => {\n${shortcutChecks.join('\n')}\n  });`,
      );
    }

    return blocks;
  }
}
