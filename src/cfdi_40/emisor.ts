import AbstractElement from '../common/abstract_element';

export type EmisorAttributes = 'Rfc' | 'Nombre' | 'RegimenFiscal' | 'FacAtrAdquirente';

export class Emisor extends AbstractElement<EmisorAttributes> {
  public getElementName(): string {
    return 'cfdi:Emisor';
  }
}
