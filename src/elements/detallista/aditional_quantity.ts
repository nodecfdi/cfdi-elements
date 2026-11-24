import { AbstractElement } from '../../common/abstract_element';

export type AditionalQuantityAttributes = 'QuantityType';

export class AditionalQuantity extends AbstractElement<AditionalQuantityAttributes> {
  public getElementName(): string {
    return 'detallista:aditionalQuantity';
  }
}
