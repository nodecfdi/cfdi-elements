import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import { AbstractElement } from '../../common/abstract_element';
import { MethodOfPayment } from './method_of_payment';

export class Transport extends AbstractElement {
  public getElementName(): string {
    return 'detallista:transport';
  }

  public getMethodOfPayment(): MethodOfPayment {
    return this.helperGetOrAdd(new MethodOfPayment());
  }

  public addMethodOfPayment(attributes: AttributesRecord = {}): MethodOfPayment {
    const subject = this.getMethodOfPayment();
    subject.addAttributes(attributes);

    return subject;
  }
}
