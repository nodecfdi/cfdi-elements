export default class Structure implements Iterable<Structure> {
  public static makeFromObject(name: string, data: object): Structure {
    let multiple = false;
    if ('muliple' in data && typeof data.muliple === 'boolean') {
      multiple = data.muliple;
    }

    const children: Structure[] = [];

    for (const [key, value] of Object.entries(data)) {
      if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
        children.push(Structure.makeFromObject(key, value as object));
      }
    }

    return new Structure(name, multiple, ...children);
  }

  private readonly _name: string;

  private readonly _multiple: boolean;

  private readonly _children: Structure[];

  public constructor(name: string, multiple: boolean, ...children: Structure[]) {
    this._name = name;
    this._multiple = multiple;
    this._children = children;
  }

  public get length(): number {
    return this._children.length;
  }

  public getName(): string {
    return this._name;
  }

  public isMultiple(): boolean {
    return this._multiple;
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
