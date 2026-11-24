import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import { AbstractElement } from '../../common/abstract_element';
import { Name } from './name';

export class CustomsNameAndAddress extends AbstractElement {
  public getElementName(): string {
    return 'detallista:nameAndAddress';
  }

  public getName(): Name {
    return this.helperGetOrAdd(new Name());
  }

  public addName(attributes: AttributesRecord = {}): Name {
    const subject = this.getName();
    subject.addAttributes(attributes);

    return subject;
  }
}
