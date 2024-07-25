import { Mixin } from 'ts-mixer';
import Retencion from '#src/cfdi_40/retencion';
import AbstractElement from '#src/common/abstract_element';

export default class Retenciones extends Mixin(AbstractElement) {
  public getElementName(): string {
    return 'cfdi:Retenciones';
  }

  public addRetencion(attributes: Record<string, unknown> = {}): Retencion {
    const subject = new Retencion(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiRetencion(...elementAttributes: Record<string, unknown>[]): this {
    for (const attributes of elementAttributes) {
      this.addRetencion(attributes);
    }

    return this;
  }
}
