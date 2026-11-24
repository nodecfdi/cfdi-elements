import { AbstractElement } from '../../common/abstract_element';

export type DatosNotarioAttributes = 'CURP' | 'NumNotaria' | 'EntidadFederativa' | 'Adscripcion';

export class DatosNotario extends AbstractElement<DatosNotarioAttributes> {
  public getElementName(): string {
    return 'notariospublicos:DatosNotario';
  }
}
