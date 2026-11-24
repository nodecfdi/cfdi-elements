import AbstractElement from '../../common/abstract_element';

export type DatosAdquirienteCopSCAttributes
  = | 'Nombre'
    | 'ApellidoPaterno'
    | 'ApellidoMaterno'
    | 'RFC'
    | 'CURP'
    | 'Porcentaje';

export class DatosAdquirienteCopSC extends AbstractElement<DatosAdquirienteCopSCAttributes> {
  public getElementName(): string {
    return 'notariospublicos:DatosAdquirienteCopSC';
  }
}
