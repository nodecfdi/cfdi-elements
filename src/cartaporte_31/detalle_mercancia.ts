import AbstractElement from '../common/abstract_element';

export type DetalleMercanciaAttributes
  = | 'UnidadPesoMerc'
    | 'PesoBruto'
    | 'PesoNeto'
    | 'PesoTara'
    | 'NumPiezas';

export class DetalleMercancia extends AbstractElement<DetalleMercanciaAttributes> {
  public getElementName(): string {
    return 'cartaporte31:DetalleMercancia';
  }
}
