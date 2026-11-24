import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import { AbstractElement } from '../../common/abstract_element';
import { EntityType } from './entity_type';

export class RequestForPaymentIdentification extends AbstractElement {
  public getElementName(): string {
    return 'detallista:requestForPaymentIdentification';
  }

  public getEntityType(): EntityType {
    return this.helperGetOrAdd(new EntityType());
  }

  public addEntityType(attributes: AttributesRecord = {}): EntityType {
    const subject = this.getEntityType();
    subject.addAttributes(attributes);

    return subject;
  }
}
