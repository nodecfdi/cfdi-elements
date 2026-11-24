import AbstractElement from '../common/abstract_element';

export type InformacionAduaneraAttributes = 'NumeroPedimento';

export class InformacionAduanera extends AbstractElement<InformacionAduaneraAttributes> {
  public getElementName(): string {
    return 'cfdi:InformacionAduanera';
  }
}
