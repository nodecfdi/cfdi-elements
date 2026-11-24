import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import type { PagoAttributes } from './pago';
import type { TotalesAttributes } from './totales';
import AbstractElement from '../../common/abstract_element';
import { Pago } from './pago';
import { Totales } from './totales';

export type PagosAttributes = 'Version';

export class Pagos extends AbstractElement<PagosAttributes> {
  public getElementName(): string {
    return 'pago20:Pagos';
  }

  public getChildrenOrder(): string[] {
    return [
      'pago20:Totales',
      'pago20:Pago',
    ];
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

  public addTotales(attributes: AttributesRecord<TotalesAttributes> = {}): Totales {
    const subject = this.getTotales();
    subject.addAttributes(attributes);

    return subject;
  }

  public addPago(attributes: AttributesRecord<PagoAttributes> = {}): Pago {
    const subject = new Pago(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiPago(...elementAttributes: AttributesRecord<PagoAttributes>[]): this {
    for (const attributes of elementAttributes) {
      this.addPago(attributes);
    }

    return this;
  }
}
