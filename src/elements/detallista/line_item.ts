import type { AttributesRecord, XmlNodeInterface } from '@nodecfdi/cfdi-core/types';
import type { AditionalQuantityAttributes } from './aditional_quantity';
import type { AlternateTradeItemIdentificationAttributes } from './alternate_trade_item_identification';
import type { InvoicedQuantityAttributes } from './invoiced_quantity';
import type { LineItemAllowanceChargeAttributes } from './line_item_allowance_charge';
import type { TradeItemDescriptionInformationAttributes } from './trade_item_description_information';
import { AbstractElement } from '../../common/abstract_element';
import { AditionalQuantity } from './aditional_quantity';
import { AlternateTradeItemIdentification } from './alternate_trade_item_identification';
import { ExtendedAttributes } from './extended_attributes';
import { GrossPrice } from './gross_price';
import { InvoicedQuantity } from './invoiced_quantity';
import { LineItemAdditionalInformation } from './line_item_additional_information';
import { LineItemAllowanceCharge } from './line_item_allowance_charge';
import { LineItemCustoms } from './line_item_customs';
import { LogisticUnits } from './logistic_units';
import { NetPrice } from './net_price';
import { PalletInformation } from './pallet_information';
import { TotalLineAmount } from './total_line_amount';
import { TradeItemDescriptionInformation } from './trade_item_description_information';
import { TradeItemIdentification } from './trade_item_identification';
import { TradeItemTaxInformation } from './trade_item_tax_information';

export type LineItemAttributes = 'type' | 'number';

export class LineItem extends AbstractElement<LineItemAttributes> {
  public getElementName(): string {
    return 'detallista:lineItem';
  }

  public getChildrenOrder(): string[] {
    return [
      'detallista:tradeItemIdentification',
      'detallista:alternateTradeItemIdentification',
      'detallista:tradeItemDescriptionInformation',
      'detallista:invoicedQuantity',
      'detallista:aditionalQuantity',
      'detallista:grossPrice',
      'detallista:netPrice',
      'detallista:AdditionalInformation',
      'detallista:Customs',
      'detallista:LogisticUnits',
      'detallista:palletInformation',
      'detallista:extendedAttributes',
      'detallista:allowanceCharge',
      'detallista:tradeItemTaxInformation',
      'detallista:totalLineAmount',
    ];
  }

  public getTradeItemIdentification(): TradeItemIdentification {
    return this.helperGetOrAdd(new TradeItemIdentification());
  }

  public addTradeItemIdentification(attributes: AttributesRecord = {}): TradeItemIdentification {
    const subject = this.getTradeItemIdentification();
    subject.addAttributes(attributes);

    return subject;
  }

  public addAlternateTradeItemIdentification(attributes: AttributesRecord<AlternateTradeItemIdentificationAttributes> = {}, children: XmlNodeInterface[] = []): AlternateTradeItemIdentification {
    const subject = new AlternateTradeItemIdentification(attributes, children);
    this.addChild(subject);

    return subject;
  }

  public multiAlternateTradeItemIdentification(...elementAttributes: AttributesRecord<AlternateTradeItemIdentificationAttributes>[]): this {
    for (const attributes of elementAttributes) {
      this.addAlternateTradeItemIdentification(attributes);
    }

    return this;
  }

  public getTradeItemDescriptionInformation(): TradeItemDescriptionInformation {
    return this.helperGetOrAdd(new TradeItemDescriptionInformation());
  }

  public addTradeItemDescriptionInformation(attributes: AttributesRecord<TradeItemDescriptionInformationAttributes> = {}): TradeItemDescriptionInformation {
    const subject = this.getTradeItemDescriptionInformation();
    subject.addAttributes(attributes);

    return subject;
  }

  public getInvoicedQuantity(): InvoicedQuantity {
    return this.helperGetOrAdd(new InvoicedQuantity());
  }

  public addInvoicedQuantity(attributes: AttributesRecord<InvoicedQuantityAttributes> = {}): InvoicedQuantity {
    const subject = this.getInvoicedQuantity();
    subject.addAttributes(attributes);

    return subject;
  }

  public addAditionalQuantity(attributes: AttributesRecord<AditionalQuantityAttributes> = {}, children: XmlNodeInterface[] = []): AditionalQuantity {
    const subject = new AditionalQuantity(attributes, children);
    this.addChild(subject);

    return subject;
  }

  public multiAditionalQuantity(...elementAttributes: AttributesRecord<AditionalQuantityAttributes>[]): this {
    for (const attributes of elementAttributes) {
      this.addAditionalQuantity(attributes);
    }

    return this;
  }

  public getGrossPrice(): GrossPrice {
    return this.helperGetOrAdd(new GrossPrice());
  }

  public addGrossPrice(attributes: AttributesRecord = {}): GrossPrice {
    const subject = this.getGrossPrice();
    subject.addAttributes(attributes);

    return subject;
  }

  public getNetPrice(): NetPrice {
    return this.helperGetOrAdd(new NetPrice());
  }

  public addNetPrice(attributes: AttributesRecord = {}): NetPrice {
    const subject = this.getNetPrice();
    subject.addAttributes(attributes);

    return subject;
  }

  public getAdditionalInformation(): LineItemAdditionalInformation {
    return this.helperGetOrAdd(new LineItemAdditionalInformation());
  }

  public addAdditionalInformation(attributes: AttributesRecord = {}): LineItemAdditionalInformation {
    const subject = this.getAdditionalInformation();
    subject.addAttributes(attributes);

    return subject;
  }

  public addCustoms(attributes: AttributesRecord = {}, children: XmlNodeInterface[] = []): LineItemCustoms {
    const subject = new LineItemCustoms(attributes, children);
    this.addChild(subject);

    return subject;
  }

  public multiCustoms(...elementAttributes: AttributesRecord[]): this {
    for (const attributes of elementAttributes) {
      this.addCustoms(attributes);
    }

    return this;
  }

  public getLogisticUnits(): LogisticUnits {
    return this.helperGetOrAdd(new LogisticUnits());
  }

  public addLogisticUnits(attributes: AttributesRecord = {}): LogisticUnits {
    const subject = this.getLogisticUnits();
    subject.addAttributes(attributes);

    return subject;
  }

  public getPalletInformation(): PalletInformation {
    return this.helperGetOrAdd(new PalletInformation());
  }

  public addPalletInformation(attributes: AttributesRecord = {}): PalletInformation {
    const subject = this.getPalletInformation();
    subject.addAttributes(attributes);

    return subject;
  }

  public getExtendedAttributes(): ExtendedAttributes {
    return this.helperGetOrAdd(new ExtendedAttributes());
  }

  public addExtendedAttributes(attributes: AttributesRecord = {}): ExtendedAttributes {
    const subject = this.getExtendedAttributes();
    subject.addAttributes(attributes);

    return subject;
  }

  public addAllowanceCharge(attributes: AttributesRecord<LineItemAllowanceChargeAttributes> = {}, children: XmlNodeInterface[] = []): LineItemAllowanceCharge {
    const subject = new LineItemAllowanceCharge(attributes, children);
    this.addChild(subject);

    return subject;
  }

  public multiAllowanceCharge(...elementAttributes: AttributesRecord<LineItemAllowanceChargeAttributes>[]): this {
    for (const attributes of elementAttributes) {
      this.addAllowanceCharge(attributes);
    }

    return this;
  }

  public addTradeItemTaxInformation(attributes: AttributesRecord = {}, children: XmlNodeInterface[] = []): TradeItemTaxInformation {
    const subject = new TradeItemTaxInformation(attributes, children);
    this.addChild(subject);

    return subject;
  }

  public multiTradeItemTaxInformation(...elementAttributes: AttributesRecord[]): this {
    for (const attributes of elementAttributes) {
      this.addTradeItemTaxInformation(attributes);
    }

    return this;
  }

  public getTotalLineAmount(): TotalLineAmount {
    return this.helperGetOrAdd(new TotalLineAmount());
  }

  public addTotalLineAmount(attributes: AttributesRecord = {}): TotalLineAmount {
    const subject = this.getTotalLineAmount();
    subject.addAttributes(attributes);

    return subject;
  }
}
