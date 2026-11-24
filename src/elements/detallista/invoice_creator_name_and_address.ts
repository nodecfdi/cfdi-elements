import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import { AbstractElement } from '../../common/abstract_element';
import { City } from './city';
import { Name } from './name';
import { PostalCode } from './postal_code';
import { StreetAddressOne } from './street_address_one';

export class InvoiceCreatorNameAndAddress extends AbstractElement {
  public getElementName(): string {
    return 'detallista:nameAndAddress';
  }

  public getChildrenOrder(): string[] {
    return [
      'detallista:name',
      'detallista:streetAddressOne',
      'detallista:city',
      'detallista:postalCode',
    ];
  }

  public getName(): Name {
    return this.helperGetOrAdd(new Name());
  }

  public addName(attributes: AttributesRecord = {}): Name {
    const subject = this.getName();
    subject.addAttributes(attributes);

    return subject;
  }

  public getStreetAddressOne(): StreetAddressOne {
    return this.helperGetOrAdd(new StreetAddressOne());
  }

  public addStreetAddressOne(attributes: AttributesRecord = {}): StreetAddressOne {
    const subject = this.getStreetAddressOne();
    subject.addAttributes(attributes);

    return subject;
  }

  public getCity(): City {
    return this.helperGetOrAdd(new City());
  }

  public addCity(attributes: AttributesRecord = {}): City {
    const subject = this.getCity();
    subject.addAttributes(attributes);

    return subject;
  }

  public getPostalCode(): PostalCode {
    return this.helperGetOrAdd(new PostalCode());
  }

  public addPostalCode(attributes: AttributesRecord = {}): PostalCode {
    const subject = this.getPostalCode();
    subject.addAttributes(attributes);

    return subject;
  }
}
