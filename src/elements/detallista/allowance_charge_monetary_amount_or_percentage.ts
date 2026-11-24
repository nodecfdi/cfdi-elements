import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import type { RateAttributes } from './rate';
import { AbstractElement } from '../../common/abstract_element';
import { Rate } from './rate';

export class AllowanceChargeMonetaryAmountOrPercentage extends AbstractElement {
  public getElementName(): string {
    return 'detallista:monetaryAmountOrPercentage';
  }

  public getRate(): Rate {
    return this.helperGetOrAdd(new Rate());
  }

  public addRate(attributes: AttributesRecord<RateAttributes> = {}): Rate {
    const subject = this.getRate();
    subject.addAttributes(attributes);

    return subject;
  }
}
