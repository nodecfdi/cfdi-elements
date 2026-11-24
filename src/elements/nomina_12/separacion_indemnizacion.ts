import { AbstractElement } from '../../common/abstract_element';

export type SeparacionIndemnizacionAttributes
  = | 'TotalPagado'
    | 'NumAñosServicio'
    | 'UltimoSueldoMensOrd'
    | 'IngresoAcumulable'
    | 'IngresoNoAcumulable';

export class SeparacionIndemnizacion extends AbstractElement<SeparacionIndemnizacionAttributes> {
  public getElementName(): string {
    return 'nomina12:SeparacionIndemnizacion';
  }
}
