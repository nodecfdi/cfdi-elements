import AbstractElement from '../../common/abstract_element';

export type DatosOperacionAttributes
  = | 'NumInstrumentoNotarial'
    | 'FechaInstNotarial'
    | 'MontoOperacion'
    | 'Subtotal'
    | 'IVA';

export class DatosOperacion extends AbstractElement<DatosOperacionAttributes> {
  public getElementName(): string {
    return 'notariospublicos:DatosOperacion';
  }
}
