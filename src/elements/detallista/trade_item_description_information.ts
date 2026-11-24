import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import { AbstractElement } from '../../common/abstract_element';
import { LongText } from './long_text';

export type TradeItemDescriptionInformationAttributes = 'language';

export class TradeItemDescriptionInformation extends AbstractElement<TradeItemDescriptionInformationAttributes> {
  public getElementName(): string {
    return 'detallista:tradeItemDescriptionInformation';
  }

  public getLongText(): LongText {
    return this.helperGetOrAdd(new LongText());
  }

  public addLongText(attributes: AttributesRecord = {}): LongText {
    const subject = this.getLongText();
    subject.addAttributes(attributes);

    return subject;
  }
}
