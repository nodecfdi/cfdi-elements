import AbstractElement from '../../common/abstract_element';

export type TrasladoDRAttributes
  = | 'BaseDR'
    | 'ImpuestoDR'
    | 'TipoFactorDR'
    | 'TasaOCuotaDR'
    | 'ImporteDR';

export class TrasladoDR extends AbstractElement<TrasladoDRAttributes> {
  public getElementName(): string {
    return 'pago20:TrasladoDR';
  }
}
