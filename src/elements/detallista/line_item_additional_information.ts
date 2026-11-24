import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import type { ReferenceIdentificationAttributes } from './reference_identification';
import { AbstractElement } from '../../common/abstract_element';
import { ReferenceIdentification } from './reference_identification';

export class LineItemAdditionalInformation extends AbstractElement {
  public getElementName(): string {
    return 'detallista:AdditionalInformation';
  }

  public getReferenceIdentification(): ReferenceIdentification {
    return this.helperGetOrAdd(new ReferenceIdentification());
  }

  public addReferenceIdentification(attributes: AttributesRecord<ReferenceIdentificationAttributes> = {}): ReferenceIdentification {
    const subject = this.getReferenceIdentification();
    subject.addAttributes(attributes);

    return subject;
  }
}
