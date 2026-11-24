import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import { AbstractElement } from '../../common/abstract_element';
import { Value } from './value';

export type TimePeriodDueAttributes = 'timePeriod';

export class TimePeriodDue extends AbstractElement<TimePeriodDueAttributes> {
  public getElementName(): string {
    return 'detallista:timePeriodDue';
  }

  public getValue(): Value {
    return this.helperGetOrAdd(new Value());
  }

  public addValue(attributes: AttributesRecord = {}): Value {
    const subject = this.getValue();
    subject.addAttributes(attributes);

    return subject;
  }
}
