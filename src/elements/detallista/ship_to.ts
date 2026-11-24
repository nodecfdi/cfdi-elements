import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import { AbstractElement } from '../../common/abstract_element';
import { Gln } from './gln';
import { ShipToNameAndAddress } from './ship_to_name_and_address';

export class ShipTo extends AbstractElement {
  public getElementName(): string {
    return 'detallista:shipTo';
  }

  public getChildrenOrder(): string[] {
    return [
      'detallista:gln',
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

  public getNameAndAddress(): ShipToNameAndAddress {
    return this.helperGetOrAdd(new ShipToNameAndAddress());
  }

  public addNameAndAddress(attributes: AttributesRecord = {}): ShipToNameAndAddress {
    const subject = this.getNameAndAddress();
    subject.addAttributes(attributes);

    return subject;
  }
}
