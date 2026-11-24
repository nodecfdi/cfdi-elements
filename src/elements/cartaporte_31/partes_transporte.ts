import { AbstractElement } from '../../common/abstract_element';

export type PartesTransporteAttributes = 'ParteTransporte';

export class PartesTransporte extends AbstractElement<PartesTransporteAttributes> {
  public getElementName(): string {
    return 'cartaporte31:PartesTransporte';
  }
}
