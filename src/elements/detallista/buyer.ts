import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import { AbstractElement } from '../../common/abstract_element';
import { ContactInformation } from './contact_information';
import { Gln } from './gln';

export class Buyer extends AbstractElement {
  public getElementName(): string {
    return 'detallista:buyer';
  }

  public getChildrenOrder(): string[] {
    return [
      'detallista:gln',
      'detallista:contactInformation',
    ];
  }

  public getGln(): Gln {
    return this.helperGetOrAdd(new Gln());
  }

  public addGln(attributes: AttributesRecord = {}): Gln {
    const subject = this.getGln();
    subject.addAttributes(attributes);

    return subject;
  }

  public getContactInformation(): ContactInformation {
    return this.helperGetOrAdd(new ContactInformation());
  }

  public addContactInformation(attributes: AttributesRecord = {}): ContactInformation {
    const subject = this.getContactInformation();
    subject.addAttributes(attributes);

    return subject;
  }
}
