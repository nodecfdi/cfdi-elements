export interface ShortcutDefinition {
  path: string[];
  target: string;
  multi?: boolean;
}

export default class Structure implements Iterable<Structure> {
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
    methodName = name,
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
    return this._children
      .map((structure) => `${prefix}${structure.getElementName()}`)
      .filter((value, index, array) => array.indexOf(value) === index);
  }

  public [Symbol.iterator](): Iterator<Structure> {
    return this._children[Symbol.iterator]();
  }

  public static makeFromObject(name: string, data: object): Structure {
    let multiple = false;
    let singleAddChild = false;
    let elementName = name;
    let methodName = name;
    const shortcuts: ShortcutDefinition[] = [];
    const attributes: string[] = [];

    if ('multiple' in data && typeof data.multiple === 'boolean') {
      multiple = data.multiple;
    }

    if ('singleAddChild' in data && typeof data.singleAddChild === 'boolean') {
      singleAddChild = data.singleAddChild;
    }

    if ('elementName' in data && typeof data.elementName === 'string') {
      elementName = data.elementName;
      methodName = data.elementName;
    }

    if ('methodName' in data && typeof data.methodName === 'string') {
      methodName = data.methodName;
    }

    if ('shortcuts' in data && Array.isArray(data.shortcuts)) {
      for (const item of data.shortcuts as unknown[]) {
        if (item === null || typeof item !== 'object') {
          continue;
        }

        const record = item as Record<string, unknown>;
        if (!Array.isArray(record.path) || typeof record.target !== 'string') {
          continue;
        }

        shortcuts.push({
          path: record.path.filter((segment): segment is string => typeof segment === 'string'),
          target: record.target,
          multi: record.multi !== false,
        });
      }
    }

    if ('attributes' in data && Array.isArray(data.attributes)) {
      for (const attr of data.attributes as unknown[]) {
        if (typeof attr === 'string' && !attributes.includes(attr)) {
          attributes.push(attr);
        }
      }
    }

    const children: Structure[] = [];

    for (const [key, value] of Object.entries(data)) {
      if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
        children.push(this.makeFromObject(key, value as object));
      }
    }

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
