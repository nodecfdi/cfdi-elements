import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import type { AlternatePartyIdentificationAttributes } from './alternate_party_identification';
import { AbstractElement } from '../../common/abstract_element';
import { AlternatePartyIdentification } from './alternate_party_identification';
import { CustomsNameAndAddress } from './customs_name_and_address';
import { Gln } from './gln';
import { ReferenceDate } from './reference_date';

export class LineItemCustoms extends AbstractElement {
  public getElementName(): string {
    return 'detallista:Customs';
  }

  public getChildrenOrder(): string[] {
    return [
      'detallista:gln',
      'detallista:alternatePartyIdentification',
      'detallista:ReferenceDate',
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

  public getReferenceDate(): ReferenceDate {
    return this.helperGetOrAdd(new ReferenceDate());
  }

  public addReferenceDate(attributes: AttributesRecord = {}): ReferenceDate {
    const subject = this.getReferenceDate();
    subject.addAttributes(attributes);

    return subject;
  }

  public getNameAndAddress(): CustomsNameAndAddress {
    return this.helperGetOrAdd(new CustomsNameAndAddress());
  }

  public addNameAndAddress(attributes: AttributesRecord = {}): CustomsNameAndAddress {
    const subject = this.getNameAndAddress();
    subject.addAttributes(attributes);

    return subject;
  }
}
