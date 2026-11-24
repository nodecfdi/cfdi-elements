import { AbstractElement } from '../../common/abstract_element';

export type NoBeneficiarioAttributes = 'PaisDeResidParaEfecFisc' | 'ConceptoPago' | 'DescripcionConcepto';

export class NoBeneficiario extends AbstractElement<NoBeneficiarioAttributes> {
  public getElementName(): string {
    return 'pagosaextranjeros:NoBeneficiario';
  }
}
