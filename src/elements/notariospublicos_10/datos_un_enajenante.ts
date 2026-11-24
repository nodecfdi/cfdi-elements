import AbstractElement from '../../common/abstract_element';

export type DatosUnEnajenanteAttributes
  = | 'Nombre'
    | 'ApellidoPaterno'
    | 'ApellidoMaterno'
    | 'RFC'
    | 'CURP';

export class DatosUnEnajenante extends AbstractElement<DatosUnEnajenanteAttributes> {
  public getElementName(): string {
    return 'notariospublicos:DatosUnEnajenante';
  }
}
