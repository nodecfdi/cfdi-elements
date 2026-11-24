import AbstractElement from '../../common/abstract_element';

export type IdentificacionVehicularAttributes = 'ConfigVehicular' | 'PesoBrutoVehicular' | 'PlacaVM' | 'AnioModeloVM';

export class IdentificacionVehicular extends AbstractElement<IdentificacionVehicularAttributes> {
  public getElementName(): string {
    return 'cartaporte31:IdentificacionVehicular';
  }
}
