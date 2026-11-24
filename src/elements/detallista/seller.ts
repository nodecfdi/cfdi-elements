import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import type { AlternatePartyIdentificationAttributes } from './alternate_party_identification';
import { AbstractElement } from '../../common/abstract_element';
import { AlternatePartyIdentification } from './alternate_party_identification';
import { Gln } from './gln';

export class Seller extends AbstractElement {
  public getElementName(): string {
    return 'detallista:seller';
  }

  public getChildrenOrder(): string[] {
    return [
      'detallista:gln',
      'detallista:alternatePartyIdentification',
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
}
