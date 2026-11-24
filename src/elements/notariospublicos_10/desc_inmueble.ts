import { AbstractElement } from '../../common/abstract_element';

export type DescInmuebleAttributes
  = | 'TipoInmueble'
    | 'Calle'
    | 'NoExterior'
    | 'NoInterior'
    | 'Colonia'
    | 'Localidad'
    | 'Referencia'
    | 'Municipio'
    | 'Estado'
    | 'Pais'
    | 'CodigoPostal';

export class DescInmueble extends AbstractElement<DescInmuebleAttributes> {
  public getElementName(): string {
    return 'notariospublicos:DescInmueble';
  }
}
