import { AbstractElement } from '../../common/abstract_element';

export type PropietarioAttributes = 'NumRegIdTrib' | 'ResidenciaFiscal';

export class Propietario extends AbstractElement<PropietarioAttributes> {
  public getElementName(): string {
    return 'cce20:Propietario';
  }
}
