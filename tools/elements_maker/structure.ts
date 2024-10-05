export default class Structure implements Iterable<Structure> {
  public static makeFromObject(name: string, data: object): Structure {
    let multiple = false;
    let singleAddChild = false;
    let elementName = name;
    if ('multiple' in data && typeof data.multiple === 'boolean') {
      multiple = data.multiple;
    }

    if ('singleAddChild' in data && typeof data.singleAddChild === 'boolean') {
      singleAddChild = data.singleAddChild;
    }

    if ('elementName' in data && typeof data.elementName === 'string') {
      elementName = data.elementName;
    }

    const children: Structure[] = [];

    for (const [key, value] of Object.entries(data)) {
      if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
        children.push(Structure.makeFromObject(key, value as object));
      }
    }

    return new Structure(name, elementName, multiple, singleAddChild, ...children);
  }

  private readonly _name: string;

  private readonly _elementName: string;

  private readonly _multiple: boolean;

  private readonly _singleAddChild: boolean;

  private readonly _children: Structure[];

  public constructor(
    name: string,
    elementName: string,
    multiple: boolean,
    singleAddChild: boolean,
    ...children: Structure[]
  ) {
    this._name = name;
    this._elementName = elementName;
    this._multiple = multiple;
    this._singleAddChild = singleAddChild;
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

  public isMultiple(): boolean {
    return this._multiple;
  }

  public isSingleAddChild(): boolean {
    return this._singleAddChild;
  }

  public getChildren(): Structure[] {
    return this._children;
  }

  public getChildrenNames(prefix: string): string[] {
    return this._children
      .map((structure) => `${prefix}${structure.getName()}`)
      .filter((value, index, array) => array.indexOf(value) === index);
  }

  public [Symbol.iterator](): Iterator<Structure> {
    return this._children[Symbol.iterator]();
  }
}
