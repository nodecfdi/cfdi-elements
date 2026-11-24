import AbstractElement from '../common/abstract_element';

export type ACuentaTercerosAttributes = 'RfcACuentaTerceros' | 'NombreACuentaTerceros' | 'RegimenFiscalACuentaTerceros' | 'DomicilioFiscalACuentaTerceros';

export class ACuentaTerceros extends AbstractElement<ACuentaTercerosAttributes> {
  public getElementName(): string {
    return 'cfdi:ACuentaTerceros';
  }
}
