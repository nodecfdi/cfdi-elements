import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import { AbstractElement } from '../../common/abstract_element';
import { Amount } from './amount';

export class GrossPrice extends AbstractElement {
  public getElementName(): string {
    return 'detallista:grossPrice';
  }

  public getAmount(): Amount {
    return this.helperGetOrAdd(new Amount());
  }

  public addAmount(attributes: AttributesRecord = {}): Amount {
    const subject = this.getAmount();
    subject.addAttributes(attributes);

    return subject;
  }
}
