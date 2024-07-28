import { Mixin } from 'ts-mixer';
import AbstractElement from '#src/common/abstract_element';
import RetencionesLocales from '#src/implocal_10/retenciones_locales';
import TrasladosLocales from '#src/implocal_10/traslados_locales';

export default class ImpuestosLocales extends Mixin(AbstractElement) {
  public getElementName(): string {
    return 'implocal:ImpuestosLocales';
  }

  public getChildrenOrder(): string[] {
    return ['implocal:RetencionesLocales', 'implocal:TrasladosLocales'];
  }

  public getFixedAttributes(): Record<string, string> {
    return {
      'xmlns:implocal': 'http://www.sat.gob.mx/implocal',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xsi:schemaLocation':
        'http://www.sat.gob.mx/implocal http://www.sat.gob.mx/sitio_internet/cfd/implocal/implocal.xsd',
      'version': '1.0',
    };
  }

  public addRetencionesLocales(attributes: Record<string, unknown> = {}): RetencionesLocales {
    const subject = new RetencionesLocales(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiRetencionesLocales(...elementAttributes: Record<string, unknown>[]): this {
    for (const attributes of elementAttributes) {
      this.addRetencionesLocales(attributes);
    }

    return this;
  }

  public addTrasladosLocales(attributes: Record<string, unknown> = {}): TrasladosLocales {
    const subject = new TrasladosLocales(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiTrasladosLocales(...elementAttributes: Record<string, unknown>[]): this {
    for (const attributes of elementAttributes) {
      this.addTrasladosLocales(attributes);
    }

    return this;
  }
}
