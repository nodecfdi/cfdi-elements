import { AbstractElement } from '../../common/abstract_element';

export type DomicilioAttributes
  = | 'Calle'
    | 'NumeroExterior'
    | 'NumeroInterior'
    | 'Colonia'
    | 'Localidad'
    | 'Referencia'
    | 'Municipio'
    | 'Estado'
    | 'Pais'
    | 'CodigoPostal';

export class Domicilio extends AbstractElement<DomicilioAttributes> {
  public getElementName(): string {
    return 'cartaporte31:Domicilio';
  }
}
