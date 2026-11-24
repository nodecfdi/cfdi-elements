import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import { AbstractElement } from '../../common/abstract_element';
import { Percentage } from './percentage';

export type DiscountPaymentAttributes = 'discountType';

export class DiscountPayment extends AbstractElement<DiscountPaymentAttributes> {
  public getElementName(): string {
    return 'detallista:discountPayment';
  }

  public getPercentage(): Percentage {
    return this.helperGetOrAdd(new Percentage());
  }

  public addPercentage(attributes: AttributesRecord = {}): Percentage {
    const subject = this.getPercentage();
    subject.addAttributes(attributes);

    return subject;
  }
}
