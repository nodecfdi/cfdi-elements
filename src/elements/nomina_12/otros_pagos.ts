import type { AttributesRecord, XmlNodeInterface } from '@nodecfdi/cfdi-core/types';
import type { OtroPagoAttributes } from './otro_pago';
import { AbstractElement } from '../../common/abstract_element';
import { OtroPago } from './otro_pago';

export class OtrosPagos extends AbstractElement {
  public getElementName(): string {
    return 'nomina12:OtrosPagos';
  }

  public addOtroPago(attributes: AttributesRecord<OtroPagoAttributes> = {}, children: XmlNodeInterface[] = []): OtroPago {
    const subject = new OtroPago(attributes, children);
    this.addChild(subject);

    return subject;
  }

  public multiOtroPago(...elementAttributes: AttributesRecord<OtroPagoAttributes>[]): this {
    for (const attributes of elementAttributes) {
      this.addOtroPago(attributes);
    }

    return this;
  }
}
