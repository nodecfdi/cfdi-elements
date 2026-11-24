import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import type { AlternatePartyIdentificationAttributes } from './alternate_party_identification';
import { AbstractElement } from '../../common/abstract_element';
import { AlternatePartyIdentification } from './alternate_party_identification';
import { Gln } from './gln';
import { InvoiceCreatorNameAndAddress } from './invoice_creator_name_and_address';

export class InvoiceCreator extends AbstractElement {
  public getElementName(): string {
    return 'detallista:InvoiceCreator';
  }

  public getChildrenOrder(): string[] {
    return [
      'detallista:gln',
      'detallista:alternatePartyIdentification',
      'detallista:nameAndAddress',
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

  public getAlternatePartyIdentification(): AlternatePartyIdentification {
    return this.helperGetOrAdd(new AlternatePartyIdentification());
  }

  public addAlternatePartyIdentification(attributes: AttributesRecord<AlternatePartyIdentificationAttributes> = {}): AlternatePartyIdentification {
    const subject = this.getAlternatePartyIdentification();
    subject.addAttributes(attributes);

    return subject;
  }

  public getNameAndAddress(): InvoiceCreatorNameAndAddress {
    return this.helperGetOrAdd(new InvoiceCreatorNameAndAddress());
  }

  public addNameAndAddress(attributes: AttributesRecord = {}): InvoiceCreatorNameAndAddress {
    const subject = this.getNameAndAddress();
    subject.addAttributes(attributes);

    return subject;
  }
}
