import AbstractElement from '../../common/abstract_element';

export type AccionesOTitulosAttributes = 'ValorMercado' | 'PrecioAlOtorgarse';

export class AccionesOTitulos extends AbstractElement<AccionesOTitulosAttributes> {
  public getElementName(): string {
    return 'nomina12:AccionesOTitulos';
  }
}
