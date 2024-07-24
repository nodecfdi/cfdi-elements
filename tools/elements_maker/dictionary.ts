export default class Dictionary {
  private readonly _values: Record<string, string>;

  public constructor(values: Record<string, string>) {
    this._values = values;
  }

  public get(key: string): string {
    return this._values[key] ?? '';
  }

  public with(key: string, value: string): Dictionary {
    return new Dictionary({
      ...this._values,
      [key]: value,
    });
  }

  public getValues(): Record<string, string> {
    return this._values;
  }

  public interpolate(subject: string): string {
    let result = subject;
    for (const [key, value] of Object.entries(this._values)) {
      result = result.replaceAll(key, value);
    }

    return result;
  }
}
