import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import { AbstractElement } from '../../common/abstract_element';
import { Amount } from './amount';
import { SpecialServicesType } from './special_services_type';

export type TotalAllowanceChargeAttributes = 'allowanceOrChargeType';

export class TotalAllowanceCharge extends AbstractElement<TotalAllowanceChargeAttributes> {
  public getElementName(): string {
    return 'detallista:TotalAllowanceCharge';
  }

  public getChildrenOrder(): string[] {
    return [
      'detallista:specialServicesType',
      'detallista:Amount',
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

  public getAmount(): Amount {
    return this.helperGetOrAdd(new Amount());
  }

  public addAmount(attributes: AttributesRecord = {}): Amount {
    const subject = this.getAmount();
    subject.addAttributes(attributes);

    return subject;
  }
}
