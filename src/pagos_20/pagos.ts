import { Mixin } from 'ts-mixer';
import AbstractElement from '#src/common/abstract_element';
import Pago from '#src/pagos_20/pago';
import Totales from '#src/pagos_20/totales';

export default class Pagos extends Mixin(AbstractElement) {
  public getElementName(): string {
    return 'pago20:Pagos';
  }

  public getChildrenOrder(): string[] {
    return ['pago20:Totales', 'pago20:Pago'];
  }

  public getFixedAttributes(): Record<string, string> {
    return {
      'xmlns:pago20': 'http://www.sat.gob.mx/Pagos20',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xsi:schemaLocation':
        'http://www.sat.gob.mx/Pagos20 http://www.sat.gob.mx/sitio_internet/cfd/Pagos/Pagos20.xsd',
      'Version': '2.0',
    };
  }

  public getTotales(): Totales {
    return this.helperGetOrAdd(new Totales());
  }

  public addTotales(attributes: Record<string, unknown> = {}): Totales {
    const subject = this.getTotales();
    subject.addAttributes(attributes);

    return subject;
  }

  public addPago(attributes: Record<string, unknown> = {}): Pago {
    const subject = new Pago(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiPago(...elementAttributes: Record<string, unknown>[]): this {
    for (const attributes of elementAttributes) {
      this.addPago(attributes);
    }

    return this;
  }
}
