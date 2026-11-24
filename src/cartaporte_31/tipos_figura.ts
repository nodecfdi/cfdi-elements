import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import type { DomicilioAttributes } from './domicilio';
import type { PartesTransporteAttributes } from './partes_transporte';
import AbstractElement from '../common/abstract_element';
import Domicilio from './domicilio';
import PartesTransporte from './partes_transporte';

export type TiposFiguraAttributes
  = | 'TipoFigura'
    | 'RFCFigura'
    | 'NumLicencia'
    | 'NombreFigura'
    | 'NumRegIdTribFigura'
    | 'ResidenciaFiscalFigura';

export default class TiposFigura extends AbstractElement<TiposFiguraAttributes> {
  public getElementName(): string {
    return 'cartaporte31:TiposFigura';
  }

  public getChildrenOrder(): string[] {
    return [
      'cartaporte31:PartesTransporte',
      'cartaporte31:Domicilio',
    ];
  }

  public addPartesTransporte(attributes: AttributesRecord<PartesTransporteAttributes> = {}): PartesTransporte {
    const subject = new PartesTransporte(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiPartesTransporte(...elementAttributes: AttributesRecord<PartesTransporteAttributes>[]): this {
    for (const attributes of elementAttributes) {
      this.addPartesTransporte(attributes);
    }

    return this;
  }

  public getDomicilio(): Domicilio {
    return this.helperGetOrAdd(new Domicilio());
  }

  public addDomicilio(attributes: AttributesRecord<DomicilioAttributes> = {}): Domicilio {
    const subject = this.getDomicilio();
    subject.addAttributes(attributes);

    return subject;
  }
}
