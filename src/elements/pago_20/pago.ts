import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import type { DoctoRelacionadoAttributes } from './docto_relacionado';
import AbstractElement from '../../common/abstract_element';
import { DoctoRelacionado } from './docto_relacionado';
import { ImpuestosP } from './impuestos_p';

export type PagoAttributes
  = | 'FechaPago'
    | 'FormaDePagoP'
    | 'MonedaP'
    | 'TipoCambioP'
    | 'Monto'
    | 'NumOperacion'
    | 'RfcEmisorCtaOrd'
    | 'NomBancoOrdExt'
    | 'CtaOrdenante'
    | 'RfcEmisorCtaBen'
    | 'CtaBeneficiario'
    | 'TipoCadPago'
    | 'CertPago'
    | 'CadPago'
    | 'SelloPago';

export class Pago extends AbstractElement<PagoAttributes> {
  public getElementName(): string {
    return 'pago20:Pago';
  }

  public getChildrenOrder(): string[] {
    return [
      'pago20:DoctoRelacionado',
      'pago20:ImpuestosP',
    ];
  }

  public addDoctoRelacionado(attributes: AttributesRecord<DoctoRelacionadoAttributes> = {}): DoctoRelacionado {
    const subject = new DoctoRelacionado(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiDoctoRelacionado(...elementAttributes: AttributesRecord<DoctoRelacionadoAttributes>[]): this {
    for (const attributes of elementAttributes) {
      this.addDoctoRelacionado(attributes);
    }

    return this;
  }

  public getImpuestosP(): ImpuestosP {
    return this.helperGetOrAdd(new ImpuestosP());
  }

  public addImpuestosP(attributes: AttributesRecord = {}): ImpuestosP {
    const subject = this.getImpuestosP();
    subject.addAttributes(attributes);

    return subject;
  }
}
