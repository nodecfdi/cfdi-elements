import type { ElementSpec, SpecificationSpec } from './structure.js';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const README_PATH = path.resolve(import.meta.dirname, '..', 'README.md');

const SPECS_START = '<!-- specifications:start -->';
const SPECS_END = '<!-- specifications:end -->';
const ELEMENTS_START = '<!-- elements:start -->';
const ELEMENTS_END = '<!-- elements:end -->';

function collectSpecFlags(
  node: ElementSpec,
  parentPath: string[],
  flags: string[],
): void {
  const isRoot = parentPath.length === 0 && node.elementName === undefined;
  const currentPath = isRoot ? [] : [...parentPath, node.name];
  const currentPathStr = currentPath.join('.');

  if (node.elementName && node.elementName !== node.name) {
    const originalPath = [...parentPath, node.elementName].join('.');
    const methodSuffix = node.methodName && node.methodName !== node.elementName
      ? `:${node.methodName}`
      : '';
    flags.push(`--rename ${originalPath}=${node.name}${methodSuffix}`);
  } else if (node.methodName && node.methodName !== (node.elementName ?? node.name)) {
    flags.push(`--method-name ${currentPathStr}=${node.methodName}`);
  }

  if (node.singleAddChild) {
    flags.push(`--single-add-child ${currentPathStr}`);
  }

  const shortcuts = node.shortcuts ?? [];
  for (const shortcut of shortcuts) {
    const modeSuffix = shortcut.multi === false ? ':single' : '';
    flags.push(`--shortcut ${currentPathStr}:${shortcut.path.join('.')}->${shortcut.target}${modeSuffix}`);
  }

  const children = node.children ?? [];
  for (const child of children) {
    collectSpecFlags(child, currentPath, flags);
  }
}

export function buildMakeSpecificationCommand(name: string, spec: SpecificationSpec): string {
  const args: string[] = [
    `pnpm make:specification ${name}${spec['xml-schemalocation'] ? ` ${spec['xml-schemalocation']}` : ''}`,
  ];

  if (spec.prefix) {
    args.push(`--prefix ${spec.prefix}`);
  }

  if (spec['xml-namespace']) {
    args.push(`--xml-namespace ${spec['xml-namespace']}`);
  }

  if (spec['version-attribute']) {
    args.push(`--version-attribute ${spec['version-attribute']}`);
  }

  if (spec['version-value']) {
    args.push(`--version-value ${spec['version-value']}`);
  }

  if (spec['xml-schemalocation']) {
    args.push('--sync-xsd');
  }

  const childFlags: string[] = [];
  const rootChildren = spec.root.children ?? [];
  const rootShortcuts = spec.root.shortcuts ?? [];

  for (const shortcut of rootShortcuts) {
    const modeSuffix = shortcut.multi === false ? ':single' : '';
    childFlags.push(`--shortcut :${shortcut.path.join('.')}->${shortcut.target}${modeSuffix}`);
  }

  for (const child of rootChildren) {
    collectSpecFlags(child, [], childFlags);
  }

  args.push(...childFlags);

  if (args.length === 1) {
    return args[0];
  }

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
  cliName: string,
  spec: SpecificationSpec,
): Promise<boolean> {
  const command = buildMakeSpecificationCommand(cliName, spec);

  return ensureSectionEntry(SPECS_START, SPECS_END, specKey, command);
}

export async function ensureElementInReadme(
  specKey: string,
  specificationFile: string,
  outputDirectory: string,
): Promise<boolean> {
  const normalizedSpec = specificationFile.replace(/^\.\//, '');
  const normalizedOutput = outputDirectory.replace(/^\.\//, '');
  const command = `pnpm make:elements ${normalizedSpec} ${normalizedOutput}`;

  return ensureSectionEntry(ELEMENTS_START, ELEMENTS_END, specKey, command);
}
