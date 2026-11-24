import AbstractElement from '../../common/abstract_element';

export type DeduccionAttributes = 'TipoDeduccion' | 'Clave' | 'Concepto' | 'Importe';

export class Deduccion extends AbstractElement<DeduccionAttributes> {
  public getElementName(): string {
    return 'nomina12:Deduccion';
  }
}
