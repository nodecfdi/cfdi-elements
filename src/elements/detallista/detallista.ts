import type { AttributesRecord, XmlNodeInterface } from '@nodecfdi/cfdi-core/types';
import type { AllowanceChargeAttributes } from './allowance_charge';
import type { CurrencyAttributes } from './currency';
import type { LineItemAttributes } from './line_item';
import type { PaymentTermsAttributes } from './payment_terms';
import type { SpecialInstructionAttributes } from './special_instruction';
import type { TotalAllowanceChargeAttributes } from './total_allowance_charge';
import { AbstractElement } from '../../common/abstract_element';
import { AdditionalInformation } from './additional_information';
import { AllowanceCharge } from './allowance_charge';
import { Buyer } from './buyer';
import { Currency } from './currency';
import { Customs } from './customs';
import { DeliveryNote } from './delivery_note';
import { InvoiceCreator } from './invoice_creator';
import { LineItem } from './line_item';
import { OrderIdentification } from './order_identification';
import { PaymentTerms } from './payment_terms';
import { RequestForPaymentIdentification } from './request_for_payment_identification';
import { Seller } from './seller';
import { ShipTo } from './ship_to';
import { ShipmentDetail } from './shipment_detail';
import { SpecialInstruction } from './special_instruction';
import { TotalAllowanceCharge } from './total_allowance_charge';
import { TotalAmount } from './total_amount';

export type DetallistaAttributes = 'type' | 'contentVersion' | 'documentStructureVersion' | 'documentStatus';

export class Detallista extends AbstractElement<DetallistaAttributes> {
  public getElementName(): string {
    return 'detallista:detallista';
  }

  public getChildrenOrder(): string[] {
    return [
      'detallista:requestForPaymentIdentification',
      'detallista:specialInstruction',
      'detallista:orderIdentification',
      'detallista:AdditionalInformation',
      'detallista:DeliveryNote',
      'detallista:buyer',
      'detallista:seller',
      'detallista:shipTo',
      'detallista:InvoiceCreator',
      'detallista:Customs',
      'detallista:currency',
      'detallista:paymentTerms',
      'detallista:shipmentDetail',
      'detallista:allowanceCharge',
      'detallista:lineItem',
      'detallista:totalAmount',
      'detallista:TotalAllowanceCharge',
    ];
  }

  public getFixedAttributes(): Record<string, string> {
    return {
      'xmlns:detallista': 'http://www.sat.gob.mx/detallista',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xsi:schemaLocation':
          'http://www.sat.gob.mx/detallista http://www.sat.gob.mx/sitio_internet/cfd/detallista/detallista.xsd',
    };
  }

  public getRequestForPaymentIdentification(): RequestForPaymentIdentification {
    return this.helperGetOrAdd(new RequestForPaymentIdentification());
  }

  public addRequestForPaymentIdentification(attributes: AttributesRecord = {}): RequestForPaymentIdentification {
    const subject = this.getRequestForPaymentIdentification();
    subject.addAttributes(attributes);

    return subject;
  }

  public addSpecialInstruction(attributes: AttributesRecord<SpecialInstructionAttributes> = {}, children: XmlNodeInterface[] = []): SpecialInstruction {
    const subject = new SpecialInstruction(attributes, children);
    this.addChild(subject);

    return subject;
  }

  public multiSpecialInstruction(...elementAttributes: AttributesRecord<SpecialInstructionAttributes>[]): this {
    for (const attributes of elementAttributes) {
      this.addSpecialInstruction(attributes);
    }

    return this;
  }

  public getOrderIdentification(): OrderIdentification {
    return this.helperGetOrAdd(new OrderIdentification());
  }

  public addOrderIdentification(attributes: AttributesRecord = {}): OrderIdentification {
    const subject = this.getOrderIdentification();
    subject.addAttributes(attributes);

    return subject;
  }

  public getAdditionalInformation(): AdditionalInformation {
    return this.helperGetOrAdd(new AdditionalInformation());
  }

  public addAdditionalInformation(attributes: AttributesRecord = {}): AdditionalInformation {
    const subject = this.getAdditionalInformation();
    subject.addAttributes(attributes);

    return subject;
  }

  public getDeliveryNote(): DeliveryNote {
    return this.helperGetOrAdd(new DeliveryNote());
  }

  public addDeliveryNote(attributes: AttributesRecord = {}): DeliveryNote {
    const subject = this.getDeliveryNote();
    subject.addAttributes(attributes);

    return subject;
  }

  public getBuyer(): Buyer {
    return this.helperGetOrAdd(new Buyer());
  }

  public addBuyer(attributes: AttributesRecord = {}): Buyer {
    const subject = this.getBuyer();
    subject.addAttributes(attributes);

    return subject;
  }

  public getSeller(): Seller {
    return this.helperGetOrAdd(new Seller());
  }

  public addSeller(attributes: AttributesRecord = {}): Seller {
    const subject = this.getSeller();
    subject.addAttributes(attributes);

    return subject;
  }

  public getShipTo(): ShipTo {
    return this.helperGetOrAdd(new ShipTo());
  }

  public addShipTo(attributes: AttributesRecord = {}): ShipTo {
    const subject = this.getShipTo();
    subject.addAttributes(attributes);

    return subject;
  }

  public getInvoiceCreator(): InvoiceCreator {
    return this.helperGetOrAdd(new InvoiceCreator());
  }

  public addInvoiceCreator(attributes: AttributesRecord = {}): InvoiceCreator {
    const subject = this.getInvoiceCreator();
    subject.addAttributes(attributes);

    return subject;
  }

  public addCustoms(attributes: AttributesRecord = {}, children: XmlNodeInterface[] = []): Customs {
    const subject = new Customs(attributes, children);
    this.addChild(subject);

    return subject;
  }

  public multiCustoms(...elementAttributes: AttributesRecord[]): this {
    for (const attributes of elementAttributes) {
      this.addCustoms(attributes);
    }

    return this;
  }

  public addCurrency(attributes: AttributesRecord<CurrencyAttributes> = {}, children: XmlNodeInterface[] = []): Currency {
    const subject = new Currency(attributes, children);
    this.addChild(subject);

    return subject;
  }

  public multiCurrency(...elementAttributes: AttributesRecord<CurrencyAttributes>[]): this {
    for (const attributes of elementAttributes) {
      this.addCurrency(attributes);
    }

    return this;
  }

  public getPaymentTerms(): PaymentTerms {
    return this.helperGetOrAdd(new PaymentTerms());
  }

  public addPaymentTerms(attributes: AttributesRecord<PaymentTermsAttributes> = {}): PaymentTerms {
    const subject = this.getPaymentTerms();
    subject.addAttributes(attributes);

    return subject;
  }

  public getShipmentDetail(): ShipmentDetail {
    return this.helperGetOrAdd(new ShipmentDetail());
  }

  public addShipmentDetail(attributes: AttributesRecord = {}): ShipmentDetail {
    const subject = this.getShipmentDetail();
    subject.addAttributes(attributes);

    return subject;
  }

  public addAllowanceCharge(attributes: AttributesRecord<AllowanceChargeAttributes> = {}, children: XmlNodeInterface[] = []): AllowanceCharge {
    const subject = new AllowanceCharge(attributes, children);
    this.addChild(subject);

    return subject;
  }

  public multiAllowanceCharge(...elementAttributes: AttributesRecord<AllowanceChargeAttributes>[]): this {
    for (const attributes of elementAttributes) {
      this.addAllowanceCharge(attributes);
    }

    return this;
  }

  public addLineItem(attributes: AttributesRecord<LineItemAttributes> = {}, children: XmlNodeInterface[] = []): LineItem {
    const subject = new LineItem(attributes, children);
    this.addChild(subject);

    return subject;
  }

  public multiLineItem(...elementAttributes: AttributesRecord<LineItemAttributes>[]): this {
    for (const attributes of elementAttributes) {
      this.addLineItem(attributes);
    }

    return this;
  }

  public getTotalAmount(): TotalAmount {
    return this.helperGetOrAdd(new TotalAmount());
  }

  public addTotalAmount(attributes: AttributesRecord = {}): TotalAmount {
    const subject = this.getTotalAmount();
    subject.addAttributes(attributes);

    return subject;
  }

  public addTotalAllowanceCharge(attributes: AttributesRecord<TotalAllowanceChargeAttributes> = {}, children: XmlNodeInterface[] = []): TotalAllowanceCharge {
    const subject = new TotalAllowanceCharge(attributes, children);
    this.addChild(subject);

    return subject;
  }

  public multiTotalAllowanceCharge(...elementAttributes: AttributesRecord<TotalAllowanceChargeAttributes>[]): this {
    for (const attributes of elementAttributes) {
      this.addTotalAllowanceCharge(attributes);
    }

    return this;
  }
}
