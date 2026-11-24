import { toPascalCase } from './string_utils.js';

export interface ShortcutDefinition {
  path: string[];
  target: string;
  multi?: boolean;
}

export interface ElementSpec {
  name: string;
  elementName?: string;
  methodName?: string;
  multiple?: boolean;
  singleAddChild?: boolean;
  attributes?: string[];
  shortcuts?: ShortcutDefinition[];
  children?: ElementSpec[];
}

export interface SpecificationSpec {
  'prefix': string;
  'xml-namespace': string;
  'xml-schemalocation': string;
  'version-attribute': string;
  'version-value': string;
  'root': ElementSpec;
}

export class Structure implements Iterable<Structure> {
  private readonly _name: string;

  private readonly _elementName: string;

  private readonly _methodName: string;

  private readonly _multiple: boolean;

  private readonly _singleAddChild: boolean;

  private readonly _shortcuts: ShortcutDefinition[];

  private readonly _attributes: string[];

  private readonly _children: Structure[];

  public constructor(
    name: string,
    elementName: string,
    multiple: boolean,
    singleAddChild: boolean,
    methodName = elementName,
    shortcuts: ShortcutDefinition[] = [],
    attributes: string[] = [],
    ...children: Structure[]
  ) {
    this._name = name;
    this._elementName = elementName;
    this._methodName = methodName;
    this._multiple = multiple;
    this._singleAddChild = singleAddChild;
    this._shortcuts = shortcuts;
    this._attributes = attributes;
    this._children = children;
  }

  public get length(): number {
    return this._children.length;
  }

  public getName(): string {
    return this._name;
  }

  public getElementName(): string {
    return this._elementName;
  }

  public getMethodName(): string {
    return this._methodName;
  }

  public isMultiple(): boolean {
    return this._multiple;
  }

  public isSingleAddChild(): boolean {
    return this._singleAddChild;
  }

  public getShortcuts(): ShortcutDefinition[] {
    return this._shortcuts;
  }

  public getAttributes(): string[] {
    return this._attributes;
  }

  public getChildren(): Structure[] {
    return this._children;
  }

  public getChildrenNames(prefix: string): string[] {
    return [...new Set(this._children.map((structure) => `${prefix}${structure.getElementName()}`))];
  }

  public [Symbol.iterator](): Iterator<Structure> {
    return this._children[Symbol.iterator]();
  }

  public static makeFromSpec(spec: ElementSpec): Structure {
    const name = toPascalCase(spec.name);
    const elementName = spec.elementName ?? spec.name;
    const methodName = spec.methodName ?? toPascalCase(elementName);
    const multiple = spec.multiple ?? false;
    const singleAddChild = spec.singleAddChild ?? false;

    const shortcuts: ShortcutDefinition[] = (spec.shortcuts ?? []).map((item) => ({
      path: item.path,
      target: item.target,
      multi: item.multi !== false,
    }));

    const attributes = [...new Set(spec.attributes)];
    const children = (spec.children ?? []).map((child) => this.makeFromSpec(child));

    return new Structure(
      name,
      elementName,
      multiple,
      singleAddChild,
      methodName,
      shortcuts,
      attributes,
      ...children,
    );
  }
}
