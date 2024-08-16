import { Mixin } from 'ts-mixer';
import AbstractElement from '#src/common/abstract_element';
import Leyenda from '#src/leyendas_fisc_10/leyenda';

export default class LeyendasFiscales extends Mixin(AbstractElement) {
  public getElementName(): string {
    return 'leyendasFisc:LeyendasFiscales';
  }

  public getFixedAttributes(): Record<string, string> {
    return {
      'xmlns:leyendasFisc': 'http://www.sat.gob.mx/leyendasFiscales',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xsi:schemaLocation':
        'http://www.sat.gob.mx/leyendasFiscales http://www.sat.gob.mx/sitio_internet/cfd/leyendasFiscales/leyendasFisc.xsd',
      'version': '1.0',
    };
  }

  public addLeyenda(attributes: Record<string, unknown> = {}): Leyenda {
    const subject = new Leyenda(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiLeyenda(...elementAttributes: Record<string, unknown>[]): this {
    for (const attributes of elementAttributes) {
      this.addLeyenda(attributes);
    }

    return this;
  }
}
