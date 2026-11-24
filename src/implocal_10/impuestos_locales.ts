import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import type { RetencionesLocalesAttributes } from './retenciones_locales';
import type { TrasladosLocalesAttributes } from './traslados_locales';
import AbstractElement from '../common/abstract_element';
import { RetencionesLocales } from './retenciones_locales';
import { TrasladosLocales } from './traslados_locales';

export type ImpuestosLocalesAttributes = 'version' | 'TotaldeRetenciones' | 'TotaldeTraslados';

export class ImpuestosLocales extends AbstractElement<ImpuestosLocalesAttributes> {
  public getElementName(): string {
    return 'implocal:ImpuestosLocales';
  }

  public getChildrenOrder(): string[] {
    return [
      'implocal:RetencionesLocales',
      'implocal:TrasladosLocales',
    ];
  }

  public getFixedAttributes(): Record<string, string> {
    return {
      'xmlns:implocal': 'https://www.sat.gob.mx/implocal',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xsi:schemaLocation':
          'https://www.sat.gob.mx/implocal https://www.sat.gob.mx/sitio_internet/cfd/implocal/implocal.xsd',
      'version': '1.0',
    };
  }

  public addRetencionesLocales(attributes: AttributesRecord<RetencionesLocalesAttributes> = {}): RetencionesLocales {
    const subject = new RetencionesLocales(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiRetencionesLocales(...elementAttributes: AttributesRecord<RetencionesLocalesAttributes>[]): this {
    for (const attributes of elementAttributes) {
      this.addRetencionesLocales(attributes);
    }

    return this;
  }

  public addTrasladosLocales(attributes: AttributesRecord<TrasladosLocalesAttributes> = {}): TrasladosLocales {
    const subject = new TrasladosLocales(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiTrasladosLocales(...elementAttributes: AttributesRecord<TrasladosLocalesAttributes>[]): this {
    for (const attributes of elementAttributes) {
      this.addTrasladosLocales(attributes);
    }

    return this;
  }
}
