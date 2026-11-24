import AbstractElement from '../../common/abstract_element';

export type TotalesAttributes
  = | 'TotalRetencionesIVA'
    | 'TotalRetencionesISR'
    | 'TotalRetencionesIEPS'
    | 'TotalTrasladosBaseIVA16'
    | 'TotalTrasladosImpuestoIVA16'
    | 'TotalTrasladosBaseIVA8'
    | 'TotalTrasladosImpuestoIVA8'
    | 'TotalTrasladosBaseIVA0'
    | 'TotalTrasladosImpuestoIVA0'
    | 'TotalTrasladosBaseIVAExento'
    | 'MontoTotalPagos';

export class Totales extends AbstractElement<TotalesAttributes> {
  public getElementName(): string {
    return 'pago20:Totales';
  }
}
