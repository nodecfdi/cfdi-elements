import type { Element } from '@nodecfdi/cfdi-core';
import type { ElementSpec, SpecificationSpec } from './structure.js';
import { readFile } from 'node:fs/promises';
import { isElement, newDocumentContent } from '@nodecfdi/cfdi-core';

export interface ParsedXsdElement {
  name: string;
  multiple: boolean;
  attributes: string[];
  fixedAttributes: Record<string, string>;
  children: ParsedXsdElement[];
}

export interface ParsedXsd {
  targetNamespace: string;
  rootElement: string;
  attributesByPath: Map<string, string[]>;
  rootNode: ParsedXsdElement | undefined;
}

function stripPrefix(name: string): string {
  const colonIndex = name.indexOf(':');

  return colonIndex === -1 ? name : name.slice(colonIndex + 1);
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

function uniquePush(target: string[], items: string[]): void {
  for (const item of items) {
    if (!target.includes(item)) {
      target.push(item);
    }
  }
}

interface XsdIndex {
  complexTypes: Map<string, Element>;
  attributeGroups: Map<string, Element>;
  topElements: Map<string, Element>;
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
      for (const contentChild of childElements(child)) {
        if (contentChild.localName !== 'extension' && contentChild.localName !== 'restriction') {
          continue;
        }

        const base = contentChild.getAttribute('base');
        if (base) {
          const baseName = stripPrefix(base);
          if (!visitedTypes.has(baseName)) {
            visitedTypes.add(baseName);
            const baseType = index.complexTypes.get(baseName);
            if (baseType) {
              collectAttributesFromNode(
                baseType,
                index,
                attributes,
                fixedAttributes,
                visitedTypes,
              );
            }
          }
        }

        collectAttributesFromNode(
          contentChild,
          index,
          attributes,
          fixedAttributes,
          visitedTypes,
        );
      }
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
      const maxOccurs = child.getAttribute('maxOccurs');
      const multiple = maxOccurs === 'unbounded' || (Boolean(maxOccurs) && Number(maxOccurs) > 1);
      results.push({ element: child, multiple });

      return;
    }
    case 'sequence':
    case 'choice':
    case 'all': {
      const groupMax = child.getAttribute('maxOccurs');
      const groupMultiple = groupMax === 'unbounded' || (Boolean(groupMax) && Number(groupMax) > 1);
      for (const nested of collectChildElementDefs(child, index, visitedTypes)) {
        results.push({
          element: nested.element,
          multiple: nested.multiple || groupMultiple,
        });
      }

      return;
    }
    case 'complexContent': {
      for (const contentChild of childElements(child)) {
        if (contentChild.localName !== 'extension' && contentChild.localName !== 'restriction') {
          continue;
        }

        const base = contentChild.getAttribute('base');
        if (base) {
          const baseName = stripPrefix(base);
          if (!visitedTypes.has(baseName)) {
            visitedTypes.add(baseName);
            const baseType = index.complexTypes.get(baseName);
            if (baseType) {
              results.push(...collectChildElementDefs(baseType, index, visitedTypes));
            }
          }
        }

        results.push(...collectChildElementDefs(contentChild, index, visitedTypes));
      }
      break;
    }
    default: {
      break;
    }
  }
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

  let complexType = childElements(element).find((child) => child.localName === 'complexType');

  if (!complexType) {
    const typeAttr = element.getAttribute('type');
    if (typeAttr) {
      complexType = index.complexTypes.get(stripPrefix(typeAttr));
    }
  }

  if (complexType) {
    collectAttributesFromNode(complexType, index, attributes, fixedAttributes, new Set());
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

  const existing = attributesByPath.get(currentPath) ?? [];
  uniquePush(existing, attributes);
  attributesByPath.set(currentPath, existing);

  return {
    name,
    multiple,
    attributes,
    fixedAttributes,
    children,
  };
}

export async function loadXsdContent(source: string): Promise<string> {
  if (!source.startsWith('http://') && !source.startsWith('https://')) {
    return readFile(source, 'utf8');
  }

  const candidates = [source];
  if (source.startsWith('http://')) {
    candidates.push(source.replace(/^http:\/\//, 'https://'));
  } else {
    candidates.push(source.replace(/^https:\/\//, 'http://'));
  }

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

export function buildElementSpecFromXsdNode(
  node: ParsedXsdElement,
  isRoot = false,
): ElementSpec {
  const result: ElementSpec = {
    name: node.name,
  };

  if (!isRoot && node.multiple) {
    result.multiple = true;
  }

  if (node.attributes.length > 0) {
    result.attributes = node.attributes;
  }

  if (node.children.length > 0) {
    result.children = node.children.map((child) => buildElementSpecFromXsdNode(child));
  }

  return result;
}
