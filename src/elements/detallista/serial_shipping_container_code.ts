import { AbstractElement } from '../../common/abstract_element';

export type SerialShippingContainerCodeAttributes = 'type';

export class SerialShippingContainerCode extends AbstractElement<SerialShippingContainerCodeAttributes> {
  public getElementName(): string {
    return 'detallista:serialShippingContainerCode';
  }
}
