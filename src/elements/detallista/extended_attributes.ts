import type { AttributesRecord, XmlNodeInterface } from '@nodecfdi/cfdi-core/types';
import type { LotNumberAttributes } from './lot_number';
import { AbstractElement } from '../../common/abstract_element';
import { LotNumber } from './lot_number';

export class ExtendedAttributes extends AbstractElement {
  public getElementName(): string {
    return 'detallista:extendedAttributes';
  }

  public addLotNumber(attributes: AttributesRecord<LotNumberAttributes> = {}, children: XmlNodeInterface[] = []): LotNumber {
    const subject = new LotNumber(attributes, children);
    this.addChild(subject);

    return subject;
  }

  public multiLotNumber(...elementAttributes: AttributesRecord<LotNumberAttributes>[]): this {
    for (const attributes of elementAttributes) {
      this.addLotNumber(attributes);
    }

    return this;
  }
}
