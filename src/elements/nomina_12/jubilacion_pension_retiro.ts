import AbstractElement from '../../common/abstract_element';

export type JubilacionPensionRetiroAttributes
  = | 'TotalUnaExhibicion'
    | 'TotalParcialidad'
    | 'MontoDiario'
    | 'IngresoAcumulable'
    | 'IngresoNoAcumulable';

export class JubilacionPensionRetiro extends AbstractElement<JubilacionPensionRetiroAttributes> {
  public getElementName(): string {
    return 'nomina12:JubilacionPensionRetiro';
  }
}
