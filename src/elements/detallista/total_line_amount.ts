import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import { AbstractElement } from '../../common/abstract_element';
import { GrossAmount } from './gross_amount';
import { NetAmount } from './net_amount';

export class TotalLineAmount extends AbstractElement {
  public getElementName(): string {
    return 'detallista:totalLineAmount';
  }

  public getChildrenOrder(): string[] {
    return [
      'detallista:grossAmount',
      'detallista:netAmount',
    ];
  }

  public getGrossAmount(): GrossAmount {
    return this.helperGetOrAdd(new GrossAmount());
  }

  public addGrossAmount(attributes: AttributesRecord = {}): GrossAmount {
    const subject = this.getGrossAmount();
    subject.addAttributes(attributes);

    return subject;
  }

  public getNetAmount(): NetAmount {
    return this.helperGetOrAdd(new NetAmount());
  }

  public addNetAmount(attributes: AttributesRecord = {}): NetAmount {
    const subject = this.getNetAmount();
    subject.addAttributes(attributes);

    return subject;
  }
}
