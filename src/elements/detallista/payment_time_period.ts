import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import type { TimePeriodDueAttributes } from './time_period_due';
import { AbstractElement } from '../../common/abstract_element';
import { TimePeriodDue } from './time_period_due';

export class PaymentTimePeriod extends AbstractElement {
  public getElementName(): string {
    return 'detallista:paymentTimePeriod';
  }

  public getTimePeriodDue(): TimePeriodDue {
    return this.helperGetOrAdd(new TimePeriodDue());
  }

  public addTimePeriodDue(attributes: AttributesRecord<TimePeriodDueAttributes> = {}): TimePeriodDue {
    const subject = this.getTimePeriodDue();
    subject.addAttributes(attributes);

    return subject;
  }
}
