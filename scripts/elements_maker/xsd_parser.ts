import type { Element } from '@nodecfdi/cfdi-core';
import type { ElementSpec, SpecificationSpec } from './structure.js';
import { readFile } from 'node:fs/promises';
import { isElement, newDocumentContent } from '@nodecfdi/cfdi-core';
import { toPascalCase, toSnakeCase } from './string_utils.js';

export interface ParsedXsdElement {
  name: string;
  multiple: boolean;
  singleAddChild: boolean;
  attributes: string[];
  fixedAttributes: Record<string, string>;
  children: ParsedXsdElement[];
}

export interface ParsedXsd {
  prefix: string;
  targetNamespace: string;
  rootElement: string;
  attributesByPath: Map<string, string[]>;
  rootNode: ParsedXsdElement | undefined;
}

const COMPOSITORS = new Set<string | null>(['sequence', 'choice', 'all']);

function stripPrefix(name: string): string {
  return name.slice(name.indexOf(':') + 1);
}

function isMultipleOccurs(element: Element): boolean {
  const maxOccurs = element.getAttribute('maxOccurs');

  return maxOccurs === 'unbounded' || Number(maxOccurs) > 1;
}

function childElements(parent: Element): Element[] {
  const result: Element[] = [];
  for (let node = parent.firstChild; node !== null; node = node.nextSibling) {
    if (isElement(node)) {
      result.push(node);
    }
  }

  return result;
}

interface XsdIndex {
  complexTypes: Map<string, Element>;
  attributeGroups: Map<string, Element>;
  topElements: Map<string, Element>;
}

/**
 * Visits each extension/restriction of a complexContent/simpleContent node: first its base type
 * (once per visitedTypes), then the derivation node itself.
 */
function forEachDerivation(
  content: Element,
  index: XsdIndex,
  visitedTypes: Set<string>,
  visit: (node: Element) => void,
): void {
  for (const derivation of childElements(content)) {
    if (derivation.localName !== 'extension' && derivation.localName !== 'restriction') {
      continue;
    }

    const baseName = stripPrefix(derivation.getAttribute('base') ?? '');
    if (baseName && !visitedTypes.has(baseName)) {
      visitedTypes.add(baseName);
      const baseType = index.complexTypes.get(baseName);
      if (baseType) {
        visit(baseType);
      }
    }

    visit(derivation);
  }
}

function collectAttributesFromChild(
  child: Element,
  index: XsdIndex,
  attributes: string[],
  fixedAttributes: Record<string, string>,
  visitedTypes: Set<string>,
): void {
  switch (child.localName) {
    case 'attribute': {
      const attrName = child.getAttribute('name');
      if (attrName && !attributes.includes(attrName)) {
        attributes.push(attrName);
      }

      const fixed = child.getAttribute('fixed');
      if (attrName && fixed) {
        fixedAttributes[attrName] = fixed;
      }

      return;
    }
    case 'attributeGroup': {
      const ref = child.getAttribute('ref');
      if (ref) {
        const group = index.attributeGroups.get(stripPrefix(ref));
        if (group) {
          collectAttributesFromNode(group, index, attributes, fixedAttributes, visitedTypes);
        }
      }

      return;
    }
    case 'complexContent':
    case 'simpleContent': {
      forEachDerivation(child, index, visitedTypes, (node) => {
        collectAttributesFromNode(node, index, attributes, fixedAttributes, visitedTypes);
      });
      break;
    }
    default: {
      break;
    }
  }
}

function collectAttributesFromNode(
  container: Element,
  index: XsdIndex,
  attributes: string[],
  fixedAttributes: Record<string, string>,
  visitedTypes: Set<string>,
): void {
  for (const child of childElements(container)) {
    collectAttributesFromChild(child, index, attributes, fixedAttributes, visitedTypes);
  }
}

function collectChildElementDefsFromChild(
  child: Element,
  index: XsdIndex,
  visitedTypes: Set<string>,
  results: { element: Element; multiple: boolean }[],
): void {
  switch (child.localName) {
    case 'element': {
      results.push({ element: child, multiple: isMultipleOccurs(child) });

      return;
    }
    case 'sequence':
    case 'choice':
    case 'all': {
      const groupMultiple = isMultipleOccurs(child);
      for (const nested of collectChildElementDefs(child, index, visitedTypes)) {
        results.push({
          element: nested.element,
          multiple: nested.multiple || groupMultiple,
        });
      }

      return;
    }
    case 'complexContent': {
      forEachDerivation(child, index, visitedTypes, (node) => {
        results.push(...collectChildElementDefs(node, index, visitedTypes));
      });
      break;
    }
    default: {
      break;
    }
  }
}

function hasWildcardAnyChild(container: Element): boolean {
  for (const child of childElements(container)) {
    if (child.localName === 'any') {
      return true;
    }

    if (COMPOSITORS.has(child.localName) && hasWildcardAnyChild(child)) {
      return true;
    }
  }

  return false;
}

function collectChildElementDefs(
  container: Element,
  index: XsdIndex,
  visitedTypes: Set<string>,
): { element: Element; multiple: boolean }[] {
  const results: { element: Element; multiple: boolean }[] = [];

  for (const child of childElements(container)) {
    collectChildElementDefsFromChild(child, index, visitedTypes, results);
  }

  return results;
}

function walkElement(
  rawElement: Element,
  multiple: boolean,
  pathPrefix: string[],
  index: XsdIndex,
  attributesByPath: Map<string, string[]>,
  activeStack: Set<string>,
): ParsedXsdElement | undefined {
  let element = rawElement;
  const ref = rawElement.getAttribute('ref');
  if (ref) {
    const resolved = index.topElements.get(stripPrefix(ref));
    if (!resolved) {
      return undefined;
    }

    element = resolved;
  }

  const name = element.getAttribute('name');
  if (!name) {
    return undefined;
  }

  const currentPathParts = [...pathPrefix, name];
  const currentPath = currentPathParts.join('/');

  const attributes: string[] = [];
  const fixedAttributes: Record<string, string> = {};
  const children: ParsedXsdElement[] = [];
  let singleAddChild = false;

  let complexType = childElements(element).find((child) => child.localName === 'complexType');

  if (!complexType) {
    const typeAttr = element.getAttribute('type');
    if (typeAttr) {
      complexType = index.complexTypes.get(stripPrefix(typeAttr));
    }
  }

  if (complexType) {
    collectAttributesFromNode(complexType, index, attributes, fixedAttributes, new Set());
    singleAddChild = hasWildcardAnyChild(complexType);
    if (!activeStack.has(currentPath)) {
      activeStack.add(currentPath);
      const childDefs = collectChildElementDefs(complexType, index, new Set());
      for (const def of childDefs) {
        const parsedChild = walkElement(
          def.element,
          def.multiple,
          currentPathParts,
          index,
          attributesByPath,
          activeStack,
        );
        if (parsedChild) {
          children.push(parsedChild);
        }
      }

      activeStack.delete(currentPath);
    }
  }

  attributesByPath.set(
    currentPath,
    [...new Set([...(attributesByPath.get(currentPath) ?? []), ...attributes])],
  );

  return {
    name,
    multiple,
    singleAddChild,
    attributes,
    fixedAttributes,
    children,
  };
}

export async function loadXsdContent(source: string): Promise<string> {
  if (!source.startsWith('http://') && !source.startsWith('https://')) {
    return readFile(source, 'utf8');
  }

  // SAT schemas are published inconsistently over http/https: try the other scheme as fallback
  const candidates = [
    source,
    source.startsWith('http://')
      ? source.replace('http://', 'https://')
      : source.replace('https://', 'http://'),
  ];

  let lastError: unknown;
  for (const url of candidates) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return await response.text();
      }

      lastError = new Error(`HTTP ${response.status} fetching ${url}`);
    } catch (error) {
      lastError = error;
    }
  }

  throw new Error(
    `Unable to fetch XSD from ${source}: ${lastError instanceof Error ? lastError.message : String(lastError)}`,
  );
}

function indexTopLevelChild(child: Element, name: string, index: XsdIndex): Element | undefined {
  switch (child.localName) {
    case 'complexType': {
      index.complexTypes.set(name, child);
      break;
    }
    case 'attributeGroup': {
      index.attributeGroups.set(name, child);
      break;
    }
    case 'element': {
      index.topElements.set(name, child);

      return child;
    }
    default: {
      break;
    }
  }

  return undefined;
}

export function parseXsd(xsdXml: string): ParsedXsd {
  const document = newDocumentContent(xsdXml);
  const schema = document.documentElement;
  if (!schema) {
    throw new Error('Invalid XSD: missing root element');
  }

  const targetNamespace = schema.getAttribute('targetNamespace') ?? '';
  let prefix = '';
  for (let i = 0; i < schema.attributes.length; i += 1) {
    const attr = schema.attributes.item(i);
    if (attr && attr.name.startsWith('xmlns:') && attr.value === targetNamespace) {
      prefix = attr.name.slice(6);
      break;
    }
  }

  const index: XsdIndex = {
    complexTypes: new Map(),
    attributeGroups: new Map(),
    topElements: new Map(),
  };

  let firstTopElement: Element | undefined;
  for (const child of childElements(schema)) {
    const name = child.getAttribute('name');
    if (!name) {
      continue;
    }

    const topElement = indexTopLevelChild(child, name, index);
    firstTopElement ??= topElement;
  }

  const attributesByPath = new Map<string, string[]>();
  const rootNode = firstTopElement
    ? walkElement(firstTopElement, false, [], index, attributesByPath, new Set())
    : undefined;

  return {
    prefix,
    targetNamespace,
    rootElement: rootNode?.name ?? '',
    attributesByPath,
    rootNode,
  };
}

function syncElementSpecAttributes(
  node: ElementSpec,
  pathParts: string[],
  attributesByPath: Map<string, string[]>,
): ElementSpec {
  const xmlName = node.elementName ?? node.name;
  const currentPath = [...pathParts, xmlName];
  const attrs = attributesByPath.get(currentPath.join('/'));

  const result: ElementSpec = {
    name: node.name,
  };

  if (node.elementName) {
    result.elementName = node.elementName;
  }

  if (node.methodName) {
    result.methodName = node.methodName;
  }

  if (node.multiple) {
    result.multiple = true;
  }

  if (node.singleAddChild) {
    result.singleAddChild = true;
  }

  if (attrs && attrs.length > 0) {
    result.attributes = attrs;
  }

  if (node.shortcuts && node.shortcuts.length > 0) {
    result.shortcuts = node.shortcuts;
  }

  if (node.children && node.children.length > 0) {
    result.children = node.children.map((child) =>
      syncElementSpecAttributes(child, currentPath, attributesByPath),
    );
  }

  return result;
}

export function syncSpecificationAttributes(
  specData: SpecificationSpec,
  attributesByPath: Map<string, string[]>,
): SpecificationSpec {
  return {
    ...specData,
    root: syncElementSpecAttributes(specData.root, [], attributesByPath),
  };
}

export function inferSpecKeyFromXsd(prefix: string, versionValue: string): string {
  const versionDigits = versionValue.replaceAll('.', '');
  const basePrefix = versionDigits && prefix.endsWith(versionDigits)
    ? prefix.slice(0, -versionDigits.length)
    : prefix;
  const snakePrefix = toSnakeCase(basePrefix);

  return versionDigits ? `${snakePrefix}_${versionDigits}` : snakePrefix;
}

function getChildrenSignature(node: ElementSpec): string {
  return (node.children ?? []).map((child) => child.elementName ?? child.name).join(',');
}

function getSharedPascalPrefix(names: string[]): string {
  const splitWords = names.map((name) => name.match(/[A-Z][a-z0-9]*/g) ?? [name]);
  const minWords = Math.min(...splitWords.map((words) => words.length));
  const shared: string[] = [];

  for (let i = 0; i < minWords; i += 1) {
    const word = splitWords[0][i];
    if (splitWords.every((words) => words[i] === word)) {
      shared.push(word);
    } else {
      break;
    }
  }

  return shared.join('');
}

function findDivergeIndex(list: { ancestors: ElementSpec[] }[]): number {
  const minAncestors = Math.min(...list.map((item) => item.ancestors.length));
  for (let i = 0; i < minAncestors; i += 1) {
    const first = list[0].ancestors[i].name;
    if (list.some((item) => item.ancestors[i].name !== first)) {
      return i;
    }
  }

  return -1;
}

interface Occurrence {
  node: ElementSpec;
  ancestors: ElementSpec[];
  sig: string;
}

function renameNode(node: ElementSpec, newName: string): void {
  node.elementName ??= node.name;
  node.name = newName;
}

function prefixWithParentName(list: Occurrence[], skip?: ElementSpec): void {
  for (const item of list) {
    const parent = item.ancestors.at(-1);
    if (parent && item.node !== skip) {
      renameNode(item.node, `${parent.name}${item.node.name}`);
    }
  }
}

function disambiguateStructuralCollisions(root: ElementSpec): void {
  const occurrences = new Map<string, Occurrence[]>();

  function collect(parent: ElementSpec, ancestors: ElementSpec[]): void {
    const children = parent.children ?? [];
    for (const child of children) {
      const list = occurrences.get(child.name) ?? [];
      list.push({ node: child, ancestors, sig: getChildrenSignature(child) });
      occurrences.set(child.name, list);
      collect(child, [...ancestors, child]);
    }
  }

  collect(root, [root]);

  for (const [, list] of occurrences) {
    if (list.length < 2) {
      continue;
    }

    const distinctSignatures = new Set(list.map((item) => item.sig));
    if (distinctSignatures.size < 2) {
      continue;
    }

    const directRootChildren = list.filter((item) => item.ancestors.length === 1);
    if (directRootChildren.length === 1) {
      prefixWithParentName(list, directRootChildren[0].node);
      continue;
    }

    const divergeIndex = findDivergeIndex(list);
    if (divergeIndex !== -1) {
      const divergingNames = list.map((item) => item.ancestors[divergeIndex].name);
      const sharedPrefix = getSharedPascalPrefix(divergingNames);
      const suffixes = sharedPrefix
        ? divergingNames.map((name) => name.slice(sharedPrefix.length))
        : [];

      if (suffixes.length > 0 && suffixes.every((suffix) => suffix.length > 0)) {
        for (const [index, item] of list.entries()) {
          renameNode(item.node, `${item.node.name}${suffixes[index]}`);
        }

        continue;
      }
    }

    prefixWithParentName(list);
  }
}

export function buildElementSpecFromXsdNode(
  node: ParsedXsdElement,
  isRoot = false,
): ElementSpec {
  const className = toPascalCase(node.name);
  const result: ElementSpec = {
    name: className,
  };

  if (className !== node.name) {
    result.elementName = node.name;
  }

  if (!isRoot && node.multiple) {
    result.multiple = true;
  }

  if (!isRoot && node.singleAddChild) {
    result.singleAddChild = true;
  }

  if (node.attributes.length > 0) {
    result.attributes = node.attributes;
  }

  if (node.children.length > 0) {
    result.children = node.children.map((child) => buildElementSpecFromXsdNode(child));
  }

  if (isRoot) {
    disambiguateStructuralCollisions(result);
  }

  return result;
}
