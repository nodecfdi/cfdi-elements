import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import { AbstractElement } from '../../common/abstract_element';
import { PercentagePerUnit } from './percentage_per_unit';
import { RatePerUnit } from './rate_per_unit';

export class LineItemMonetaryAmountOrPercentage extends AbstractElement {
  public getElementName(): string {
    return 'detallista:monetaryAmountOrPercentage';
  }

  public getChildrenOrder(): string[] {
    return [
      'detallista:percentagePerUnit',
      'detallista:ratePerUnit',
    ];
  }

  public getPercentagePerUnit(): PercentagePerUnit {
    return this.helperGetOrAdd(new PercentagePerUnit());
  }

  public addPercentagePerUnit(attributes: AttributesRecord = {}): PercentagePerUnit {
    const subject = this.getPercentagePerUnit();
    subject.addAttributes(attributes);

    return subject;
  }

  public getRatePerUnit(): RatePerUnit {
    return this.helperGetOrAdd(new RatePerUnit());
  }

  public addRatePerUnit(attributes: AttributesRecord = {}): RatePerUnit {
    const subject = this.getRatePerUnit();
    subject.addAttributes(attributes);

    return subject;
  }
}
