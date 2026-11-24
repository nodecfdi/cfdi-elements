import AbstractElement from '../common/abstract_element';
import RetencionDR from './retencion_dr';

export default class RetencionesDR extends AbstractElement {
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
