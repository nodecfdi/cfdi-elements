import { AbstractElement } from '../../common/abstract_element';

export type DatosEnajenanteCopSCAttributes
  = | 'Nombre'
    | 'ApellidoPaterno'
    | 'ApellidoMaterno'
    | 'RFC'
    | 'CURP'
    | 'Porcentaje';

export class DatosEnajenanteCopSC extends AbstractElement<DatosEnajenanteCopSCAttributes> {
  public getElementName(): string {
    return 'notariospublicos:DatosEnajenanteCopSC';
  }
}
