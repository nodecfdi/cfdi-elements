import { AbstractElement } from '../../common/abstract_element';

export type TrasladoPAttributes
  = | 'BaseP'
    | 'ImpuestoP'
    | 'TipoFactorP'
    | 'TasaOCuotaP'
    | 'ImporteP';

export class TrasladoP extends AbstractElement<TrasladoPAttributes> {
  public getElementName(): string {
    return 'pago20:TrasladoP';
  }
}
