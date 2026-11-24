import AbstractElement from '../../common/abstract_element';

export type ReceptorAttributes
  = | 'Rfc'
    | 'Nombre'
    | 'DomicilioFiscalReceptor'
    | 'ResidenciaFiscal'
    | 'NumRegIdTrib'
    | 'RegimenFiscalReceptor'
    | 'UsoCFDI';

export class Receptor extends AbstractElement<ReceptorAttributes> {
  public getElementName(): string {
    return 'cfdi:Receptor';
  }
}
