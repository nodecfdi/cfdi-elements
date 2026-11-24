import AbstractElement from '../../common/abstract_element';

export type BeneficiarioAttributes
  = | 'RFC'
    | 'CURP'
    | 'NomDenRazSocB'
    | 'ConceptoPago'
    | 'DescripcionConcepto';

export class Beneficiario extends AbstractElement<BeneficiarioAttributes> {
  public getElementName(): string {
    return 'pagosaextranjeros:Beneficiario';
  }
}
