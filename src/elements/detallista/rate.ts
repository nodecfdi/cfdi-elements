import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import { AbstractElement } from '../../common/abstract_element';
import { Percentage } from './percentage';

export type RateAttributes = 'base';

export class Rate extends AbstractElement<RateAttributes> {
  public getElementName(): string {
    return 'detallista:rate';
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
