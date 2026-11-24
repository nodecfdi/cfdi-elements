import { AbstractElement } from '../../common/abstract_element';

export type RetencionDRAttributes
  = | 'BaseDR'
    | 'ImpuestoDR'
    | 'TipoFactorDR'
    | 'TasaOCuotaDR'
    | 'ImporteDR';

export class RetencionDR extends AbstractElement<RetencionDRAttributes> {
  public getElementName(): string {
    return 'pago20:RetencionDR';
  }
}
