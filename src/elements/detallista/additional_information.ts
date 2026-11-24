import type { AttributesRecord, XmlNodeInterface } from '@nodecfdi/cfdi-core/types';
import type { ReferenceIdentificationAttributes } from './reference_identification';
import { AbstractElement } from '../../common/abstract_element';
import { ReferenceIdentification } from './reference_identification';

export class AdditionalInformation extends AbstractElement {
  public getElementName(): string {
    return 'detallista:AdditionalInformation';
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
}
