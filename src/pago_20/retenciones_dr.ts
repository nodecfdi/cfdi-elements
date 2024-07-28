import { Mixin } from 'ts-mixer';
import AbstractElement from '#src/common/abstract_element';
import RetencionDR from '#src/pago_20/retencion_dr';

export default class RetencionesDR extends Mixin(AbstractElement) {
  public getElementName(): string {
    return 'pago20:RetencionesDR';
  }

  public addRetencionDR(attributes: Record<string, unknown> = {}): RetencionDR {
    const subject = new RetencionDR(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiRetencionDR(...elementAttributes: Record<string, unknown>[]): this {
    for (const attributes of elementAttributes) {
      this.addRetencionDR(attributes);
    }

    return this;
  }
}
