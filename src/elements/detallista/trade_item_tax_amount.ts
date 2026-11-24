import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import { AbstractElement } from '../../common/abstract_element';
import { TaxAmount } from './tax_amount';
import { TaxPercentage } from './tax_percentage';

export class TradeItemTaxAmount extends AbstractElement {
  public getElementName(): string {
    return 'detallista:tradeItemTaxAmount';
  }

  public getChildrenOrder(): string[] {
    return [
      'detallista:taxPercentage',
      'detallista:taxAmount',
    ];
  }

  public getTaxPercentage(): TaxPercentage {
    return this.helperGetOrAdd(new TaxPercentage());
  }

  public addTaxPercentage(attributes: AttributesRecord = {}): TaxPercentage {
    const subject = this.getTaxPercentage();
    subject.addAttributes(attributes);

    return subject;
  }

  public getTaxAmount(): TaxAmount {
    return this.helperGetOrAdd(new TaxAmount());
  }

  public addTaxAmount(attributes: AttributesRecord = {}): TaxAmount {
    const subject = this.getTaxAmount();
    subject.addAttributes(attributes);

    return subject;
  }
}
