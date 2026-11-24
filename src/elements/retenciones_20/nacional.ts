import AbstractElement from '../../common/abstract_element';

export type NacionalAttributes = 'RfcR' | 'NomDenRazSocR' | 'CurpR' | 'DomicilioFiscalR';

export class Nacional extends AbstractElement<NacionalAttributes> {
  public getElementName(): string {
    return 'retenciones:Nacional';
  }
}
