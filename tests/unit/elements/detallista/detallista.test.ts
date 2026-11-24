import { describe, expect, test } from 'vitest';
import {
  AdditionalInformation,
  AditionalQuantity,
  AllowanceCharge,
  AllowanceChargeMonetaryAmountOrPercentage,
  AlternatePartyIdentification,
  AlternateTradeItemIdentification,
  Amount,
  AmountPerUnit,
  Buyer,
  City,
  ContactInformation,
  Currency,
  CurrencyFunction,
  Customs,
  CustomsNameAndAddress,
  DeliveryNote,
  Description,
  Detallista,
  DiscountPayment,
  EntityType,
  ExtendedAttributes,
  Gln,
  GrossAmount,
  GrossPrice,
  Gtin,
  InvoiceCreator,
  InvoiceCreatorNameAndAddress,
  InvoicedQuantity,
  LineItem,
  LineItemAdditionalInformation,
  LineItemAllowanceCharge,
  LineItemCustoms,
  LineItemMonetaryAmountOrPercentage,
  LogisticUnits,
  LongText,
  LotNumber,
  MethodOfPayment,
  Name,
  NetAmount,
  NetPayment,
  NetPrice,
  OrderIdentification,
  PalletInformation,
  PalletQuantity,
  PaymentTerms,
  PaymentTimePeriod,
  Percentage,
  PercentagePerUnit,
  PersonOrDepartmentName,
  PostalCode,
  Rate,
  RateOfChange,
  RatePerUnit,
  ReferenceDate,
  ReferenceIdentification,
  ReferenceNumber,
  RequestForPaymentIdentification,
  Seller,
  SerialShippingContainerCode,
  ShipmentDetail,
  ShipTo,
  ShipToNameAndAddress,
  SpecialInstruction,
  SpecialServicesType,
  StreetAddressOne,
  TaxAmount,
  TaxCategory,
  TaxPercentage,
  TaxTypeDescription,
  Text,
  TimePeriodDue,
  TotalAllowanceCharge,
  TotalAmount,
  TotalLineAmount,
  TradeItemDescriptionInformation,
  TradeItemIdentification,
  TradeItemTaxAmount,
  TradeItemTaxInformation,
  Transport,
  Value,
} from '../../../../src/elements/detallista/index';

describe('detallista', () => {
  test('detallista', ({ assert }) => {
    const element = new Detallista();
    expect(element).toElementHasName('detallista:detallista');
    expect(element).toElementHasOrder([
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
    ]);
    expect(element).toElementHasFixedAttributes({
      'xmlns:detallista': 'http://www.sat.gob.mx/detallista',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xsi:schemaLocation':
        'http://www.sat.gob.mx/detallista http://www.sat.gob.mx/sitio_internet/cfd/detallista/detallista.xsd',
    });
    assert.toElementHasChildSingle(element, RequestForPaymentIdentification);
    assert.toElementHasChildMultiple(element, SpecialInstruction);
    assert.toElementHasChildSingle(element, OrderIdentification);
    assert.toElementHasChildSingle(element, AdditionalInformation);
    assert.toElementHasChildSingle(element, DeliveryNote);
    assert.toElementHasChildSingle(element, Buyer);
    assert.toElementHasChildSingle(element, Seller);
    assert.toElementHasChildSingle(element, ShipTo);
    assert.toElementHasChildSingle(element, InvoiceCreator);
    assert.toElementHasChildMultiple(element, Customs);
    assert.toElementHasChildMultiple(element, Currency);
    assert.toElementHasChildSingle(element, PaymentTerms);
    assert.toElementHasChildSingle(element, ShipmentDetail);
    assert.toElementHasChildMultiple(element, AllowanceCharge);
    assert.toElementHasChildMultiple(element, LineItem);
    assert.toElementHasChildSingle(element, TotalAmount);
    assert.toElementHasChildMultiple(element, TotalAllowanceCharge);
  });

  test('request for payment identification', ({ assert }) => {
    const element = new RequestForPaymentIdentification();
    expect(element).toElementHasName('detallista:requestForPaymentIdentification');
    assert.toElementHasChildSingle(element, EntityType);
  });

  test('entity type', () => {
    const element = new EntityType();
    expect(element).toElementHasName('detallista:entityType');
  });

  test('special instruction', ({ assert }) => {
    const element = new SpecialInstruction();
    expect(element).toElementHasName('detallista:specialInstruction');
    assert.toElementHasChildMultiple(element, Text);
  });

  test('text', () => {
    const element = new Text();
    expect(element).toElementHasName('detallista:text');
  });

  test('order identification', ({ assert }) => {
    const element = new OrderIdentification();
    expect(element).toElementHasName('detallista:orderIdentification');
    expect(element).toElementHasOrder([
      'detallista:referenceIdentification',
      'detallista:ReferenceDate',
    ]);
    assert.toElementHasChildMultiple(element, ReferenceIdentification);
    assert.toElementHasChildSingle(element, ReferenceDate);
  });

  test('reference identification', () => {
    const element = new ReferenceIdentification();
    expect(element).toElementHasName('detallista:referenceIdentification');
  });

  test('reference date', () => {
    const element = new ReferenceDate();
    expect(element).toElementHasName('detallista:ReferenceDate');
  });

  test('additional information', ({ assert }) => {
    const element = new AdditionalInformation();
    expect(element).toElementHasName('detallista:AdditionalInformation');
    assert.toElementHasChildMultiple(element, ReferenceIdentification);
  });

  test('delivery note', ({ assert }) => {
    const element = new DeliveryNote();
    expect(element).toElementHasName('detallista:DeliveryNote');
    expect(element).toElementHasOrder([
      'detallista:referenceIdentification',
      'detallista:ReferenceDate',
    ]);
    assert.toElementHasChildMultiple(element, ReferenceIdentification);
    assert.toElementHasChildSingle(element, ReferenceDate);
  });

  test('buyer', ({ assert }) => {
    const element = new Buyer();
    expect(element).toElementHasName('detallista:buyer');
    expect(element).toElementHasOrder(['detallista:gln', 'detallista:contactInformation']);
    assert.toElementHasChildSingle(element, Gln);
    assert.toElementHasChildSingle(element, ContactInformation);
  });

  test('gln', () => {
    const element = new Gln();
    expect(element).toElementHasName('detallista:gln');
  });

  test('contact information', ({ assert }) => {
    const element = new ContactInformation();
    expect(element).toElementHasName('detallista:contactInformation');
    assert.toElementHasChildSingle(element, PersonOrDepartmentName);
  });

  test('person or department name', ({ assert }) => {
    const element = new PersonOrDepartmentName();
    expect(element).toElementHasName('detallista:personOrDepartmentName');
    assert.toElementHasChildSingle(element, Text);
  });

  test('seller', ({ assert }) => {
    const element = new Seller();
    expect(element).toElementHasName('detallista:seller');
    expect(element).toElementHasOrder([
      'detallista:gln',
      'detallista:alternatePartyIdentification',
    ]);
    assert.toElementHasChildSingle(element, Gln);
    assert.toElementHasChildSingle(element, AlternatePartyIdentification);
  });

  test('alternate party identification', () => {
    const element = new AlternatePartyIdentification();
    expect(element).toElementHasName('detallista:alternatePartyIdentification');
  });

  test('ship to', ({ assert }) => {
    const element = new ShipTo();
    expect(element).toElementHasName('detallista:shipTo');
    expect(element).toElementHasOrder(['detallista:gln', 'detallista:nameAndAddress']);
    assert.toElementHasChildSingle(element, Gln);
    assert.toElementHasChildSingle(element, ShipToNameAndAddress, 'getNameAndAddress', 'addNameAndAddress');
  });

  test('ship to name and address', ({ assert }) => {
    const element = new ShipToNameAndAddress();
    expect(element).toElementHasName('detallista:nameAndAddress');
    expect(element).toElementHasOrder([
      'detallista:name',
      'detallista:streetAddressOne',
      'detallista:city',
      'detallista:postalCode',
    ]);
    assert.toElementHasChildMultiple(element, Name);
    assert.toElementHasChildMultiple(element, StreetAddressOne);
    assert.toElementHasChildMultiple(element, City);
    assert.toElementHasChildMultiple(element, PostalCode);
  });

  test('name', () => {
    const element = new Name();
    expect(element).toElementHasName('detallista:name');
  });

  test('street address one', () => {
    const element = new StreetAddressOne();
    expect(element).toElementHasName('detallista:streetAddressOne');
  });

  test('city', () => {
    const element = new City();
    expect(element).toElementHasName('detallista:city');
  });

  test('postal code', () => {
    const element = new PostalCode();
    expect(element).toElementHasName('detallista:postalCode');
  });

  test('invoice creator', ({ assert }) => {
    const element = new InvoiceCreator();
    expect(element).toElementHasName('detallista:InvoiceCreator');
    expect(element).toElementHasOrder([
      'detallista:gln',
      'detallista:alternatePartyIdentification',
      'detallista:nameAndAddress',
    ]);
    assert.toElementHasChildSingle(element, Gln);
    assert.toElementHasChildSingle(element, AlternatePartyIdentification);
    assert.toElementHasChildSingle(element, InvoiceCreatorNameAndAddress, 'getNameAndAddress', 'addNameAndAddress');
  });

  test('invoice creator name and address', ({ assert }) => {
    const element = new InvoiceCreatorNameAndAddress();
    expect(element).toElementHasName('detallista:nameAndAddress');
    expect(element).toElementHasOrder([
      'detallista:name',
      'detallista:streetAddressOne',
      'detallista:city',
      'detallista:postalCode',
    ]);
    assert.toElementHasChildSingle(element, Name);
    assert.toElementHasChildSingle(element, StreetAddressOne);
    assert.toElementHasChildSingle(element, City);
    assert.toElementHasChildSingle(element, PostalCode);
  });

  test('customs', ({ assert }) => {
    const element = new Customs();
    expect(element).toElementHasName('detallista:Customs');
    assert.toElementHasChildSingle(element, Gln);
  });

  test('currency', ({ assert }) => {
    const element = new Currency();
    expect(element).toElementHasName('detallista:currency');
    expect(element).toElementHasOrder(['detallista:currencyFunction', 'detallista:rateOfChange']);
    assert.toElementHasChildMultiple(element, CurrencyFunction);
    assert.toElementHasChildSingle(element, RateOfChange);
  });

  test('currency function', () => {
    const element = new CurrencyFunction();
    expect(element).toElementHasName('detallista:currencyFunction');
  });

  test('rate of change', () => {
    const element = new RateOfChange();
    expect(element).toElementHasName('detallista:rateOfChange');
  });

  test('payment terms', ({ assert }) => {
    const element = new PaymentTerms();
    expect(element).toElementHasName('detallista:paymentTerms');
    expect(element).toElementHasOrder(['detallista:netPayment', 'detallista:discountPayment']);
    assert.toElementHasChildSingle(element, NetPayment);
    assert.toElementHasChildSingle(element, DiscountPayment);
  });

  test('net payment', ({ assert }) => {
    const element = new NetPayment();
    expect(element).toElementHasName('detallista:netPayment');
    assert.toElementHasChildSingle(element, PaymentTimePeriod);
  });

  test('payment time period', ({ assert }) => {
    const element = new PaymentTimePeriod();
    expect(element).toElementHasName('detallista:paymentTimePeriod');
    assert.toElementHasChildSingle(element, TimePeriodDue);
  });

  test('time period due', ({ assert }) => {
    const element = new TimePeriodDue();
    expect(element).toElementHasName('detallista:timePeriodDue');
    assert.toElementHasChildSingle(element, Value);
  });

  test('value', () => {
    const element = new Value();
    expect(element).toElementHasName('detallista:value');
  });

  test('discount payment', ({ assert }) => {
    const element = new DiscountPayment();
    expect(element).toElementHasName('detallista:discountPayment');
    assert.toElementHasChildSingle(element, Percentage);
  });

  test('percentage', () => {
    const element = new Percentage();
    expect(element).toElementHasName('detallista:percentage');
  });

  test('shipment detail', () => {
    const element = new ShipmentDetail();
    expect(element).toElementHasName('detallista:shipmentDetail');
  });

  test('allowance charge', ({ assert }) => {
    const element = new AllowanceCharge();
    expect(element).toElementHasName('detallista:allowanceCharge');
    expect(element).toElementHasOrder([
      'detallista:specialServicesType',
      'detallista:monetaryAmountOrPercentage',
    ]);
    assert.toElementHasChildSingle(element, SpecialServicesType);
    assert.toElementHasChildSingle(element, AllowanceChargeMonetaryAmountOrPercentage, 'getMonetaryAmountOrPercentage', 'addMonetaryAmountOrPercentage');
  });

  test('special services type', () => {
    const element = new SpecialServicesType();
    expect(element).toElementHasName('detallista:specialServicesType');
  });

  test('allowance charge monetary amount or percentage', ({ assert }) => {
    const element = new AllowanceChargeMonetaryAmountOrPercentage();
    expect(element).toElementHasName('detallista:monetaryAmountOrPercentage');
    assert.toElementHasChildSingle(element, Rate);
  });

  test('rate', ({ assert }) => {
    const element = new Rate();
    expect(element).toElementHasName('detallista:rate');
    assert.toElementHasChildSingle(element, Percentage);
  });

  test('line item', ({ assert }) => {
    const element = new LineItem();
    expect(element).toElementHasName('detallista:lineItem');
    expect(element).toElementHasOrder([
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
    ]);
    assert.toElementHasChildSingle(element, TradeItemIdentification);
    assert.toElementHasChildMultiple(element, AlternateTradeItemIdentification);
    assert.toElementHasChildSingle(element, TradeItemDescriptionInformation);
    assert.toElementHasChildSingle(element, InvoicedQuantity);
    assert.toElementHasChildMultiple(element, AditionalQuantity);
    assert.toElementHasChildSingle(element, GrossPrice);
    assert.toElementHasChildSingle(element, NetPrice);
    assert.toElementHasChildSingle(element, LineItemAdditionalInformation, 'getAdditionalInformation', 'addAdditionalInformation');
    assert.toElementHasChildMultiple(element, LineItemCustoms, 'Customs');
    assert.toElementHasChildSingle(element, LogisticUnits);
    assert.toElementHasChildSingle(element, PalletInformation);
    assert.toElementHasChildSingle(element, ExtendedAttributes);
    assert.toElementHasChildMultiple(element, LineItemAllowanceCharge, 'AllowanceCharge');
    assert.toElementHasChildMultiple(element, TradeItemTaxInformation);
    assert.toElementHasChildSingle(element, TotalLineAmount);
  });

  test('trade item identification', ({ assert }) => {
    const element = new TradeItemIdentification();
    expect(element).toElementHasName('detallista:tradeItemIdentification');
    assert.toElementHasChildSingle(element, Gtin);
  });

  test('gtin', () => {
    const element = new Gtin();
    expect(element).toElementHasName('detallista:gtin');
  });

  test('alternate trade item identification', () => {
    const element = new AlternateTradeItemIdentification();
    expect(element).toElementHasName('detallista:alternateTradeItemIdentification');
  });

  test('trade item description information', ({ assert }) => {
    const element = new TradeItemDescriptionInformation();
    expect(element).toElementHasName('detallista:tradeItemDescriptionInformation');
    assert.toElementHasChildSingle(element, LongText);
  });

  test('long text', () => {
    const element = new LongText();
    expect(element).toElementHasName('detallista:longText');
  });

  test('invoiced quantity', () => {
    const element = new InvoicedQuantity();
    expect(element).toElementHasName('detallista:invoicedQuantity');
  });

  test('aditional quantity', () => {
    const element = new AditionalQuantity();
    expect(element).toElementHasName('detallista:aditionalQuantity');
  });

  test('gross price', ({ assert }) => {
    const element = new GrossPrice();
    expect(element).toElementHasName('detallista:grossPrice');
    assert.toElementHasChildSingle(element, Amount);
  });

  test('amount', () => {
    const element = new Amount();
    expect(element).toElementHasName('detallista:Amount');
  });

  test('net price', ({ assert }) => {
    const element = new NetPrice();
    expect(element).toElementHasName('detallista:netPrice');
    assert.toElementHasChildSingle(element, Amount);
  });

  test('line item additional information', ({ assert }) => {
    const element = new LineItemAdditionalInformation();
    expect(element).toElementHasName('detallista:AdditionalInformation');
    assert.toElementHasChildSingle(element, ReferenceIdentification);
  });

  test('line item customs', ({ assert }) => {
    const element = new LineItemCustoms();
    expect(element).toElementHasName('detallista:Customs');
    expect(element).toElementHasOrder([
      'detallista:gln',
      'detallista:alternatePartyIdentification',
      'detallista:ReferenceDate',
      'detallista:nameAndAddress',
    ]);
    assert.toElementHasChildSingle(element, Gln);
    assert.toElementHasChildSingle(element, AlternatePartyIdentification);
    assert.toElementHasChildSingle(element, ReferenceDate);
    assert.toElementHasChildSingle(element, CustomsNameAndAddress, 'getNameAndAddress', 'addNameAndAddress');
  });

  test('customs name and address', ({ assert }) => {
    const element = new CustomsNameAndAddress();
    expect(element).toElementHasName('detallista:nameAndAddress');
    assert.toElementHasChildSingle(element, Name);
  });

  test('logistic units', ({ assert }) => {
    const element = new LogisticUnits();
    expect(element).toElementHasName('detallista:LogisticUnits');
    assert.toElementHasChildSingle(element, SerialShippingContainerCode);
  });

  test('serial shipping container code', () => {
    const element = new SerialShippingContainerCode();
    expect(element).toElementHasName('detallista:serialShippingContainerCode');
  });

  test('pallet information', ({ assert }) => {
    const element = new PalletInformation();
    expect(element).toElementHasName('detallista:palletInformation');
    expect(element).toElementHasOrder([
      'detallista:palletQuantity',
      'detallista:description',
      'detallista:transport',
    ]);
    assert.toElementHasChildSingle(element, PalletQuantity);
    assert.toElementHasChildSingle(element, Description);
    assert.toElementHasChildSingle(element, Transport);
  });

  test('pallet quantity', () => {
    const element = new PalletQuantity();
    expect(element).toElementHasName('detallista:palletQuantity');
  });

  test('description', () => {
    const element = new Description();
    expect(element).toElementHasName('detallista:description');
  });

  test('transport', ({ assert }) => {
    const element = new Transport();
    expect(element).toElementHasName('detallista:transport');
    assert.toElementHasChildSingle(element, MethodOfPayment);
  });

  test('method of payment', () => {
    const element = new MethodOfPayment();
    expect(element).toElementHasName('detallista:methodOfPayment');
  });

  test('extended attributes', ({ assert }) => {
    const element = new ExtendedAttributes();
    expect(element).toElementHasName('detallista:extendedAttributes');
    assert.toElementHasChildMultiple(element, LotNumber);
  });

  test('lot number', () => {
    const element = new LotNumber();
    expect(element).toElementHasName('detallista:lotNumber');
  });

  test('line item allowance charge', ({ assert }) => {
    const element = new LineItemAllowanceCharge();
    expect(element).toElementHasName('detallista:allowanceCharge');
    expect(element).toElementHasOrder([
      'detallista:specialServicesType',
      'detallista:monetaryAmountOrPercentage',
    ]);
    assert.toElementHasChildSingle(element, SpecialServicesType);
    assert.toElementHasChildSingle(element, LineItemMonetaryAmountOrPercentage, 'getMonetaryAmountOrPercentage', 'addMonetaryAmountOrPercentage');
  });

  test('line item monetary amount or percentage', ({ assert }) => {
    const element = new LineItemMonetaryAmountOrPercentage();
    expect(element).toElementHasName('detallista:monetaryAmountOrPercentage');
    expect(element).toElementHasOrder(['detallista:percentagePerUnit', 'detallista:ratePerUnit']);
    assert.toElementHasChildSingle(element, PercentagePerUnit);
    assert.toElementHasChildSingle(element, RatePerUnit);
  });

  test('percentage per unit', () => {
    const element = new PercentagePerUnit();
    expect(element).toElementHasName('detallista:percentagePerUnit');
  });

  test('rate per unit', ({ assert }) => {
    const element = new RatePerUnit();
    expect(element).toElementHasName('detallista:ratePerUnit');
    assert.toElementHasChildSingle(element, AmountPerUnit);
  });

  test('amount per unit', () => {
    const element = new AmountPerUnit();
    expect(element).toElementHasName('detallista:amountPerUnit');
  });

  test('trade item tax information', ({ assert }) => {
    const element = new TradeItemTaxInformation();
    expect(element).toElementHasName('detallista:tradeItemTaxInformation');
    expect(element).toElementHasOrder([
      'detallista:taxTypeDescription',
      'detallista:referenceNumber',
      'detallista:tradeItemTaxAmount',
      'detallista:taxCategory',
    ]);
    assert.toElementHasChildSingle(element, TaxTypeDescription);
    assert.toElementHasChildSingle(element, ReferenceNumber);
    assert.toElementHasChildSingle(element, TradeItemTaxAmount);
    assert.toElementHasChildSingle(element, TaxCategory);
  });

  test('tax type description', () => {
    const element = new TaxTypeDescription();
    expect(element).toElementHasName('detallista:taxTypeDescription');
  });

  test('reference number', () => {
    const element = new ReferenceNumber();
    expect(element).toElementHasName('detallista:referenceNumber');
  });

  test('trade item tax amount', ({ assert }) => {
    const element = new TradeItemTaxAmount();
    expect(element).toElementHasName('detallista:tradeItemTaxAmount');
    expect(element).toElementHasOrder(['detallista:taxPercentage', 'detallista:taxAmount']);
    assert.toElementHasChildSingle(element, TaxPercentage);
    assert.toElementHasChildSingle(element, TaxAmount);
  });

  test('tax percentage', () => {
    const element = new TaxPercentage();
    expect(element).toElementHasName('detallista:taxPercentage');
  });

  test('tax amount', () => {
    const element = new TaxAmount();
    expect(element).toElementHasName('detallista:taxAmount');
  });

  test('tax category', () => {
    const element = new TaxCategory();
    expect(element).toElementHasName('detallista:taxCategory');
  });

  test('total line amount', ({ assert }) => {
    const element = new TotalLineAmount();
    expect(element).toElementHasName('detallista:totalLineAmount');
    expect(element).toElementHasOrder(['detallista:grossAmount', 'detallista:netAmount']);
    assert.toElementHasChildSingle(element, GrossAmount);
    assert.toElementHasChildSingle(element, NetAmount);
  });

  test('gross amount', ({ assert }) => {
    const element = new GrossAmount();
    expect(element).toElementHasName('detallista:grossAmount');
    assert.toElementHasChildSingle(element, Amount);
  });

  test('net amount', ({ assert }) => {
    const element = new NetAmount();
    expect(element).toElementHasName('detallista:netAmount');
    assert.toElementHasChildSingle(element, Amount);
  });

  test('total amount', ({ assert }) => {
    const element = new TotalAmount();
    expect(element).toElementHasName('detallista:totalAmount');
    assert.toElementHasChildSingle(element, Amount);
  });

  test('total allowance charge', ({ assert }) => {
    const element = new TotalAllowanceCharge();
    expect(element).toElementHasName('detallista:TotalAllowanceCharge');
    expect(element).toElementHasOrder(['detallista:specialServicesType', 'detallista:Amount']);
    assert.toElementHasChildSingle(element, SpecialServicesType);
    assert.toElementHasChildSingle(element, Amount);
  });
});
