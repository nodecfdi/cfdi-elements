import type { AttributesRecord, XmlNodeInterface } from '@nodecfdi/cfdi-core/types';
import { AbstractElement } from '../../common/abstract_element';
import { CurrencyFunction } from './currency_function';
import { RateOfChange } from './rate_of_change';

export type CurrencyAttributes = 'currencyISOCode';

export class Currency extends AbstractElement<CurrencyAttributes> {
  public getElementName(): string {
    return 'detallista:currency';
  }

  public getChildrenOrder(): string[] {
    return [
      'detallista:currencyFunction',
      'detallista:rateOfChange',
    ];
  }

  public addCurrencyFunction(attributes: AttributesRecord = {}, children: XmlNodeInterface[] = []): CurrencyFunction {
    const subject = new CurrencyFunction(attributes, children);
    this.addChild(subject);

    return subject;
  }

  public multiCurrencyFunction(...elementAttributes: AttributesRecord[]): this {
    for (const attributes of elementAttributes) {
      this.addCurrencyFunction(attributes);
    }

    return this;
  }

  public getRateOfChange(): RateOfChange {
    return this.helperGetOrAdd(new RateOfChange());
  }

  public addRateOfChange(attributes: AttributesRecord = {}): RateOfChange {
    const subject = this.getRateOfChange();
    subject.addAttributes(attributes);

    return subject;
  }
}
