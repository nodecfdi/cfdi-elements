import type { AttributesRecord, XmlNodeInterface } from '@nodecfdi/cfdi-core/types';
import { AbstractElement } from '../../common/abstract_element';
import { City } from './city';
import { Name } from './name';
import { PostalCode } from './postal_code';
import { StreetAddressOne } from './street_address_one';

export class ShipToNameAndAddress extends AbstractElement {
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

  public addName(attributes: AttributesRecord = {}, children: XmlNodeInterface[] = []): Name {
    const subject = new Name(attributes, children);
    this.addChild(subject);

    return subject;
  }

  public multiName(...elementAttributes: AttributesRecord[]): this {
    for (const attributes of elementAttributes) {
      this.addName(attributes);
    }

    return this;
  }

  public addStreetAddressOne(attributes: AttributesRecord = {}, children: XmlNodeInterface[] = []): StreetAddressOne {
    const subject = new StreetAddressOne(attributes, children);
    this.addChild(subject);

    return subject;
  }

  public multiStreetAddressOne(...elementAttributes: AttributesRecord[]): this {
    for (const attributes of elementAttributes) {
      this.addStreetAddressOne(attributes);
    }

    return this;
  }

  public addCity(attributes: AttributesRecord = {}, children: XmlNodeInterface[] = []): City {
    const subject = new City(attributes, children);
    this.addChild(subject);

    return subject;
  }

  public multiCity(...elementAttributes: AttributesRecord[]): this {
    for (const attributes of elementAttributes) {
      this.addCity(attributes);
    }

    return this;
  }

  public addPostalCode(attributes: AttributesRecord = {}, children: XmlNodeInterface[] = []): PostalCode {
    const subject = new PostalCode(attributes, children);
    this.addChild(subject);

    return subject;
  }

  public multiPostalCode(...elementAttributes: AttributesRecord[]): this {
    for (const attributes of elementAttributes) {
      this.addPostalCode(attributes);
    }

    return this;
  }
}
