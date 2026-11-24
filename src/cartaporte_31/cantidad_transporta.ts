import AbstractElement from '../common/abstract_element';

export type CantidadTransportaAttributes = 'Cantidad' | 'IDOrigen' | 'IDDestino' | 'CvesTransporte';

export default class CantidadTransporta extends AbstractElement<CantidadTransportaAttributes> {
  public getElementName(): string {
    return 'cartaporte31:CantidadTransporta';
  }
}
