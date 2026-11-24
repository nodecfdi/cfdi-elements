import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import type { DiscountPaymentAttributes } from './discount_payment';
import type { NetPaymentAttributes } from './net_payment';
import { AbstractElement } from '../../common/abstract_element';
import { DiscountPayment } from './discount_payment';
import { NetPayment } from './net_payment';

export type PaymentTermsAttributes = 'paymentTermsEvent' | 'PaymentTermsRelationTime';

export class PaymentTerms extends AbstractElement<PaymentTermsAttributes> {
  public getElementName(): string {
    return 'detallista:paymentTerms';
  }

  public getChildrenOrder(): string[] {
    return [
      'detallista:netPayment',
      'detallista:discountPayment',
    ];
  }

  public getNetPayment(): NetPayment {
    return this.helperGetOrAdd(new NetPayment());
  }

  public addNetPayment(attributes: AttributesRecord<NetPaymentAttributes> = {}): NetPayment {
    const subject = this.getNetPayment();
    subject.addAttributes(attributes);

    return subject;
  }

  public getDiscountPayment(): DiscountPayment {
    return this.helperGetOrAdd(new DiscountPayment());
  }

  public addDiscountPayment(attributes: AttributesRecord<DiscountPaymentAttributes> = {}): DiscountPayment {
    const subject = this.getDiscountPayment();
    subject.addAttributes(attributes);

    return subject;
  }
}
