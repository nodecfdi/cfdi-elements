import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import { AbstractElement } from '../../common/abstract_element';
import { AllowanceChargeMonetaryAmountOrPercentage } from './allowance_charge_monetary_amount_or_percentage';
import { SpecialServicesType } from './special_services_type';

export type AllowanceChargeAttributes = 'allowanceChargeType' | 'settlementType' | 'sequenceNumber';

export class AllowanceCharge extends AbstractElement<AllowanceChargeAttributes> {
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

  public getMonetaryAmountOrPercentage(): AllowanceChargeMonetaryAmountOrPercentage {
    return this.helperGetOrAdd(new AllowanceChargeMonetaryAmountOrPercentage());
  }

  public addMonetaryAmountOrPercentage(attributes: AttributesRecord = {}): AllowanceChargeMonetaryAmountOrPercentage {
    const subject = this.getMonetaryAmountOrPercentage();
    subject.addAttributes(attributes);

    return subject;
  }
}
