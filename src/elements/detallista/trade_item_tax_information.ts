import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import { AbstractElement } from '../../common/abstract_element';
import { ReferenceNumber } from './reference_number';
import { TaxCategory } from './tax_category';
import { TaxTypeDescription } from './tax_type_description';
import { TradeItemTaxAmount } from './trade_item_tax_amount';

export class TradeItemTaxInformation extends AbstractElement {
  public getElementName(): string {
    return 'detallista:tradeItemTaxInformation';
  }

  public getChildrenOrder(): string[] {
    return [
      'detallista:taxTypeDescription',
      'detallista:referenceNumber',
      'detallista:tradeItemTaxAmount',
      'detallista:taxCategory',
    ];
  }

  public getTaxTypeDescription(): TaxTypeDescription {
    return this.helperGetOrAdd(new TaxTypeDescription());
  }

  public addTaxTypeDescription(attributes: AttributesRecord = {}): TaxTypeDescription {
    const subject = this.getTaxTypeDescription();
    subject.addAttributes(attributes);

    return subject;
  }

  public getReferenceNumber(): ReferenceNumber {
    return this.helperGetOrAdd(new ReferenceNumber());
  }

  public addReferenceNumber(attributes: AttributesRecord = {}): ReferenceNumber {
    const subject = this.getReferenceNumber();
    subject.addAttributes(attributes);

    return subject;
  }

  public getTradeItemTaxAmount(): TradeItemTaxAmount {
    return this.helperGetOrAdd(new TradeItemTaxAmount());
  }

  public addTradeItemTaxAmount(attributes: AttributesRecord = {}): TradeItemTaxAmount {
    const subject = this.getTradeItemTaxAmount();
    subject.addAttributes(attributes);

    return subject;
  }

  public getTaxCategory(): TaxCategory {
    return this.helperGetOrAdd(new TaxCategory());
  }

  public addTaxCategory(attributes: AttributesRecord = {}): TaxCategory {
    const subject = this.getTaxCategory();
    subject.addAttributes(attributes);

    return subject;
  }
}
