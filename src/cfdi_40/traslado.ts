import AbstractElement from '../common/abstract_element';

export type TrasladoAttributes
  = | 'Base'
    | 'Impuesto'
    | 'TipoFactor'
    | 'TasaOCuota'
    | 'Importe';

export default class Traslado extends AbstractElement<TrasladoAttributes> {
  public getElementName(): string {
    return 'cfdi:Traslado';
  }
}
