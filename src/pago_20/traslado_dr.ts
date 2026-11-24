import AbstractElement from '../common/abstract_element';

export type TrasladoDRAttributes
  = | 'BaseDR'
    | 'ImpuestoDR'
    | 'TipoFactorDR'
    | 'TasaOCuotaDR'
    | 'ImporteDR';

export default class TrasladoDR extends AbstractElement<TrasladoDRAttributes> {
  public getElementName(): string {
    return 'pago20:TrasladoDR';
  }
}
