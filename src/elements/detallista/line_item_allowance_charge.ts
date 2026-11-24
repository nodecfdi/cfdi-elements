import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import { AbstractElement } from '../../common/abstract_element';
import { LineItemMonetaryAmountOrPercentage } from './line_item_monetary_amount_or_percentage';
import { SpecialServicesType } from './special_services_type';

export type LineItemAllowanceChargeAttributes = 'allowanceChargeType' | 'settlementType' | 'sequenceNumber';

export class LineItemAllowanceCharge extends AbstractElement<LineItemAllowanceChargeAttributes> {
  public getElementName(): string {
    return 'detallista:allowanceCharge';
  }

  public getChildrenOrder(): string[] {
    return [
      'detallista:specialServicesType',
      'detallista:monetaryAmountOrPercentage',
    ];
  }

  public getSpecialServicesType(): SpecialServicesType {
    return this.helperGetOrAdd(new SpecialServicesType());
  }

  public addSpecialServicesType(attributes: AttributesRecord = {}): SpecialServicesType {
    const subject = this.getSpecialServicesType();
    subject.addAttributes(attributes);

    return subject;
  }

  public getMonetaryAmountOrPercentage(): LineItemMonetaryAmountOrPercentage {
    return this.helperGetOrAdd(new LineItemMonetaryAmountOrPercentage());
  }

  public addMonetaryAmountOrPercentage(attributes: AttributesRecord = {}): LineItemMonetaryAmountOrPercentage {
    const subject = this.getMonetaryAmountOrPercentage();
    subject.addAttributes(attributes);

    return subject;
  }
}
