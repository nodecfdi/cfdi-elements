import type { ElementSpec, SpecificationSpec } from './structure.js';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { toPascalCase } from './string_utils.js';

const README_PATH = path.resolve(import.meta.dirname, '..', 'README.md');

const SPECS_START = '<!-- specifications:start -->';
const SPECS_END = '<!-- specifications:end -->';
const ELEMENTS_START = '<!-- elements:start -->';
const ELEMENTS_END = '<!-- elements:end -->';

// Paths are relative to the root (root itself is the empty path), as resolveNodeByPath expects.
function collectSpecFlags(
  node: ElementSpec,
  parentPath: string[] | undefined,
  flags: string[],
): void {
  const currentPath = parentPath ? [...parentPath, node.name] : [];
  const currentPathStr = currentPath.join('.');

  const defaultClassName = toPascalCase(node.elementName ?? node.name);

  if (node.elementName && node.elementName !== node.name && defaultClassName !== node.name) {
    const originalPath = parentPath ? [...parentPath, node.elementName].join('.') : '.';
    const methodSuffix = node.methodName && node.methodName !== defaultClassName
      ? `:${node.methodName}`
      : '';
    flags.push(`--rename ${originalPath}=${node.name}${methodSuffix}`);
  } else if (node.methodName && node.methodName !== defaultClassName) {
    flags.push(`--method-name ${currentPathStr}=${node.methodName}`);
  }

  if (node.singleAddChild) {
    flags.push(`--single-add-child ${currentPathStr}`);
  }

  const shortcuts = node.shortcuts ?? [];
  for (const shortcut of shortcuts) {
    const modeSuffix = shortcut.multi === false ? ':single' : '';
    flags.push(`--shortcut '${currentPathStr}:${shortcut.path.join('.')}->${shortcut.target}${modeSuffix}'`);
  }

  const children = node.children ?? [];
  for (const child of children) {
    collectSpecFlags(child, currentPath, flags);
  }
}

export interface InferredXsdMetadata {
  specKey: string;
  prefix: string;
  xmlNamespace: string;
  versionAttribute: string;
  versionValue: string;
}

export function buildMakeSpecificationCommand(
  specKey: string,
  explicitName: string | undefined,
  spec: SpecificationSpec,
  inferred?: InferredXsdMetadata,
): string {
  const args: string[] = [
    `pnpm make:specification ${spec['xml-schemalocation']}`,
  ];

  if (explicitName && specKey !== inferred?.specKey) {
    args.push(`--name ${explicitName}`);
  }

  if (spec.prefix && spec.prefix !== inferred?.prefix) {
    args.push(`--prefix ${spec.prefix}`);
  }

  if (spec['xml-namespace'] && spec['xml-namespace'] !== inferred?.xmlNamespace) {
    args.push(`--xml-namespace ${spec['xml-namespace']}`);
  }

  if (spec['version-attribute'] && spec['version-attribute'] !== inferred?.versionAttribute) {
    args.push(`--version-attribute ${spec['version-attribute']}`);
  }

  if (spec['version-value'] && spec['version-value'] !== inferred?.versionValue) {
    args.push(`--version-value ${spec['version-value']}`);
  }

  collectSpecFlags(spec.root, undefined, args);

  return args.join(' \\\n  ');
}

async function ensureSectionEntry(
  startMarker: string,
  endMarker: string,
  entryId: string,
  command: string,
): Promise<boolean> {
  const content = await readFile(README_PATH, 'utf8');
  const startIndex = content.indexOf(startMarker);
  const endIndex = content.indexOf(endMarker);

  if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
    return false;
  }

  const section = content.slice(startIndex, endIndex);
  const heading = `### \`${entryId}\``;
  if (section.includes(heading)) {
    return false;
  }

  const block = `\n${heading}\n\n\`\`\`sh\n${command}\n\`\`\`\n`;
  const updated = `${content.slice(0, endIndex)}${block}\n${content.slice(endIndex)}`;
  await writeFile(README_PATH, updated, 'utf8');

  return true;
}

export async function ensureSpecificationInReadme(
  specKey: string,
  explicitName: string | undefined,
  spec: SpecificationSpec,
  inferred?: InferredXsdMetadata,
): Promise<boolean> {
  const command = buildMakeSpecificationCommand(specKey, explicitName, spec, inferred);

  return ensureSectionEntry(SPECS_START, SPECS_END, specKey, command);
}

export async function ensureElementInReadme(
  specKey: string,
  specificationFile: string,
  outputDirectory: string,
  withTests = false,
): Promise<boolean> {
  const normalizedSpec = specificationFile.replace(/^\.\//, '');
  const normalizedOutput = outputDirectory.replace(/^\.\//, '');
  const testsFlag = withTests ? ' --with-tests' : '';
  const command = `pnpm make:elements ${normalizedSpec} ${normalizedOutput}${testsFlag}`;

  return ensureSectionEntry(ELEMENTS_START, ELEMENTS_END, specKey, command);
}
