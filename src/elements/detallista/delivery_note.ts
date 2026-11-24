import type { AttributesRecord, XmlNodeInterface } from '@nodecfdi/cfdi-core/types';
import type { ReferenceIdentificationAttributes } from './reference_identification';
import { AbstractElement } from '../../common/abstract_element';
import { ReferenceDate } from './reference_date';
import { ReferenceIdentification } from './reference_identification';

export class DeliveryNote extends AbstractElement {
  public getElementName(): string {
    return 'detallista:DeliveryNote';
  }

  public getChildrenOrder(): string[] {
    return [
      'detallista:referenceIdentification',
      'detallista:ReferenceDate',
    ];
  }

  public addReferenceIdentification(attributes: AttributesRecord<ReferenceIdentificationAttributes> = {}, children: XmlNodeInterface[] = []): ReferenceIdentification {
    const subject = new ReferenceIdentification(attributes, children);
    this.addChild(subject);

    return subject;
  }

  public multiReferenceIdentification(...elementAttributes: AttributesRecord<ReferenceIdentificationAttributes>[]): this {
    for (const attributes of elementAttributes) {
      this.addReferenceIdentification(attributes);
    }

    return this;
  }

  public getReferenceDate(): ReferenceDate {
    return this.helperGetOrAdd(new ReferenceDate());
  }

  public addReferenceDate(attributes: AttributesRecord = {}): ReferenceDate {
    const subject = this.getReferenceDate();
    subject.addAttributes(attributes);

    return subject;
  }
}
