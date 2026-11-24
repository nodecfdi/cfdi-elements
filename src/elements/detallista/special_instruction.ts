import type { AttributesRecord, XmlNodeInterface } from '@nodecfdi/cfdi-core/types';
import { AbstractElement } from '../../common/abstract_element';
import { Text } from './text';

export type SpecialInstructionAttributes = 'code';

export class SpecialInstruction extends AbstractElement<SpecialInstructionAttributes> {
  public getElementName(): string {
    return 'detallista:specialInstruction';
  }

  public addText(attributes: AttributesRecord = {}, children: XmlNodeInterface[] = []): Text {
    const subject = new Text(attributes, children);
    this.addChild(subject);

    return subject;
  }

  public multiText(...elementAttributes: AttributesRecord[]): this {
    for (const attributes of elementAttributes) {
      this.addText(attributes);
    }

    return this;
  }
}
