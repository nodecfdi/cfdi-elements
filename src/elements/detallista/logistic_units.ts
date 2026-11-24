import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import type { SerialShippingContainerCodeAttributes } from './serial_shipping_container_code';
import { AbstractElement } from '../../common/abstract_element';
import { SerialShippingContainerCode } from './serial_shipping_container_code';

export class LogisticUnits extends AbstractElement {
  public getElementName(): string {
    return 'detallista:LogisticUnits';
  }

  public getSerialShippingContainerCode(): SerialShippingContainerCode {
    return this.helperGetOrAdd(new SerialShippingContainerCode());
  }

  public addSerialShippingContainerCode(attributes: AttributesRecord<SerialShippingContainerCodeAttributes> = {}): SerialShippingContainerCode {
    const subject = this.getSerialShippingContainerCode();
    subject.addAttributes(attributes);

    return subject;
  }
}
