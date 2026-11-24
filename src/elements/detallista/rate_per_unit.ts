import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import { AbstractElement } from '../../common/abstract_element';
import { AmountPerUnit } from './amount_per_unit';

export class RatePerUnit extends AbstractElement {
  public getElementName(): string {
    return 'detallista:ratePerUnit';
  }

  public getAmountPerUnit(): AmountPerUnit {
    return this.helperGetOrAdd(new AmountPerUnit());
  }

  public addAmountPerUnit(attributes: AttributesRecord = {}): AmountPerUnit {
    const subject = this.getAmountPerUnit();
    subject.addAttributes(attributes);

    return subject;
  }
}
