import type { AttributesRecord, XmlNodeInterface } from '@nodecfdi/cfdi-core/types';
import type { EntidadAttributes } from './entidad';
import { AbstractElement } from '../../common/abstract_element';
import { Entidad } from './entidad';

export type INEAttributes = 'Version' | 'TipoProceso' | 'TipoComite' | 'IdContabilidad';

export class INE extends AbstractElement<INEAttributes> {
  public getElementName(): string {
    return 'ine:INE';
  }

  public getFixedAttributes(): Record<string, string> {
    return {
      'xmlns:ine': 'http://www.sat.gob.mx/ine',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xsi:schemaLocation':
          'http://www.sat.gob.mx/ine http://www.sat.gob.mx/sitio_internet/cfd/ine/ine11.xsd',
      'Version': '1.1',
    };
  }

  public addEntidad(attributes: AttributesRecord<EntidadAttributes> = {}, children: XmlNodeInterface[] = []): Entidad {
    const subject = new Entidad(attributes, children);
    this.addChild(subject);

    return subject;
  }

  public multiEntidad(...elementAttributes: AttributesRecord<EntidadAttributes>[]): this {
    for (const attributes of elementAttributes) {
      this.addEntidad(attributes);
    }

    return this;
  }
}
