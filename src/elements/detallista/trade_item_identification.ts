import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import { AbstractElement } from '../../common/abstract_element';
import { Gtin } from './gtin';

export class TradeItemIdentification extends AbstractElement {
  public getElementName(): string {
    return 'detallista:tradeItemIdentification';
  }

  public getGtin(): Gtin {
    return this.helperGetOrAdd(new Gtin());
  }

  public addGtin(attributes: AttributesRecord = {}): Gtin {
    const subject = this.getGtin();
    subject.addAttributes(attributes);

    return subject;
  }
}
