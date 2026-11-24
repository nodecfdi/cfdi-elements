import AbstractElement from '../../common/abstract_element';

export type DatosUnAdquirienteAttributes
  = | 'Nombre'
    | 'ApellidoPaterno'
    | 'ApellidoMaterno'
    | 'RFC'
    | 'CURP';

export class DatosUnAdquiriente extends AbstractElement<DatosUnAdquirienteAttributes> {
  public getElementName(): string {
    return 'notariospublicos:DatosUnAdquiriente';
  }
}
