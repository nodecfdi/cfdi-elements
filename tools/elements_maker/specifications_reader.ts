import { existsSync, readFileSync } from 'node:fs';

export default class SpecificationsReader {
  public static fromFile(specFile: string): SpecificationsReader {
    if (!existsSync(specFile)) {
      throw new Error(`Specification file '${specFile}' does not exists`);
    }

    try {
      const specContents = readFileSync(specFile);

      return SpecificationsReader.fromJsonString(specContents.toString());
    } catch {
      throw new Error(`Unable to read ${specFile}`);
    }
  }

  public static fromJsonString(specContents: string): SpecificationsReader {
    let data: unknown;
    try {
      data = JSON.parse(specContents);
    } catch {
      throw new SyntaxError('Unable to parse the JSON specification');
    }

    if (typeof data !== 'object' || data === null) {
      throw new TypeError('The JSON specification does not contains a valid root object');
    }

    return new SpecificationsReader(data as Record<string, unknown>);
  }

  private _data: Record<string, unknown>;

  public constructor(data: Record<string, unknown>) {
    this._data = data;
  }

  public keyAsString(name: string): string {
    if (!(name in this._data)) {
      return '';
    }

    if (typeof this._data[name] !== 'string') {
      return '';
    }

    return this._data[name];
  }

  public keyAsObject(name: string): object {
    if (!(name in this._data)) {
      return {};
    }

    if (typeof this._data[name] !== 'object' || this._data[name] === null) {
      return {};
    }

    return this._data[name];
  }
}
