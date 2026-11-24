import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import { AbstractElement } from '../../common/abstract_element';
import { PaymentTimePeriod } from './payment_time_period';

export type NetPaymentAttributes = 'netPaymentTermsType';

export class NetPayment extends AbstractElement<NetPaymentAttributes> {
  public getElementName(): string {
    return 'detallista:netPayment';
  }

  public getPaymentTimePeriod(): PaymentTimePeriod {
    return this.helperGetOrAdd(new PaymentTimePeriod());
  }

  public addPaymentTimePeriod(attributes: AttributesRecord = {}): PaymentTimePeriod {
    const subject = this.getPaymentTimePeriod();
    subject.addAttributes(attributes);

    return subject;
  }
}
