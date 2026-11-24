import type { ElementSpec } from './structure.js';
import { Dictionary } from './dictionary.js';
import { SpecificationsReader } from './specifications_reader.js';
import { Structure } from './structure.js';

export class Specifications {
  private _structure: Structure;

  private _dictionary: Dictionary;

  public constructor(structure: Structure, dictionary: Dictionary) {
    this._structure = structure;
    this._dictionary = dictionary;
  }

  public getStructure(): Structure {
    return this._structure;
  }

  public getDictionary(): Dictionary {
    return this._dictionary;
  }

  public static makeFromFile(specFile: string): Specifications {
    const specFileReader = SpecificationsReader.fromFile(specFile);
    const root = specFileReader.keyAsObject('root') as ElementSpec;

    if (!root.name) {
      throw new Error(`Specification file '${specFile}' is missing a valid 'root.name'`);
    }

    const structure = Structure.makeFromSpec(root);

    const dictionary = new Dictionary({
      '#prefix#': specFileReader.keyAsString('prefix'),
      '#xml-namespace#': specFileReader.keyAsString('xml-namespace'),
      '#xml-schemalocation#': specFileReader.keyAsString('xml-schemalocation'),
      '#version-attribute#': specFileReader.keyAsString('version-attribute'),
      '#version-value#': specFileReader.keyAsString('version-value'),
    });

    return new Specifications(structure, dictionary);
  }
}
