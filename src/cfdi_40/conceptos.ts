import { Mixin } from 'ts-mixer';
import Concepto from '#src/cfdi_40/concepto';
import AbstractElement from '#src/common/abstract_element';

export default class Conceptos extends Mixin(AbstractElement) {
  public getElementName(): string {
    return 'cfdi:Conceptos';
  }

  public addConcepto(attributes: Record<string, unknown> = {}): Concepto {
    const subject = new Concepto(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiConcepto(...elementAttributes: Record<string, unknown>[]): this {
    for (const attributes of elementAttributes) {
      this.addConcepto(attributes);
    }

    return this;
  }
}
