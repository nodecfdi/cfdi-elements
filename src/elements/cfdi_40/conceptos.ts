import type { AttributesRecord, XmlNodeInterface } from '@nodecfdi/cfdi-core/types';
import type { ConceptoAttributes } from './concepto';
import { AbstractElement } from '../../common/abstract_element';
import { Concepto } from './concepto';

export class Conceptos extends AbstractElement {
  public getElementName(): string {
    return 'cfdi:Conceptos';
  }

  public addConcepto(attributes: AttributesRecord<ConceptoAttributes> = {}, children: XmlNodeInterface[] = []): Concepto {
    const subject = new Concepto(attributes, children);
    this.addChild(subject);

    return subject;
  }

  public multiConcepto(...elementAttributes: AttributesRecord<ConceptoAttributes>[]): this {
    for (const attributes of elementAttributes) {
      this.addConcepto(attributes);
    }

    return this;
  }
}
