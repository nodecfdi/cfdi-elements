import AbstractElement from '../../common/abstract_element';

export type ExtranjeroAttributes = 'NumRegIdTribR' | 'NomDenRazSocR';

export class Extranjero extends AbstractElement<ExtranjeroAttributes> {
  public getElementName(): string {
    return 'retenciones:Extranjero';
  }
}
