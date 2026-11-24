import AbstractElement from '../../common/abstract_element';

export type InmuebleAttributes
  = | 'Calle'
    | 'NoExterior'
    | 'NoInterior'
    | 'Colonia'
    | 'Localidad'
    | 'Referencia'
    | 'Municipio'
    | 'Estado'
    | 'CodigoPostal';

export class Inmueble extends AbstractElement<InmuebleAttributes> {
  public getElementName(): string {
    return 'servicioparcial:Inmueble';
  }
}
