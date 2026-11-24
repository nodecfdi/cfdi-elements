import { AbstractElement } from '../../common/abstract_element';

export type EmisorAttributes = 'RfcE' | 'NomDenRazSocE' | 'RegimenFiscalE';

export class Emisor extends AbstractElement<EmisorAttributes> {
  public getElementName(): string {
    return 'retenciones:Emisor';
  }
}
