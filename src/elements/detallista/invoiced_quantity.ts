import { AbstractElement } from '../../common/abstract_element';

export type InvoicedQuantityAttributes = 'unitOfMeasure';

export class InvoicedQuantity extends AbstractElement<InvoicedQuantityAttributes> {
  public getElementName(): string {
    return 'detallista:invoicedQuantity';
  }
}
