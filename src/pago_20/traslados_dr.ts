import AbstractElement from '../common/abstract_element';
import TrasladoDR from './traslado_dr';

export default class TrasladosDR extends AbstractElement {
  public getElementName(): string {
    return 'pago20:TrasladosDR';
  }

  public addTrasladoDR(attributes: Record<string, unknown> = {}): TrasladoDR {
    const subject = new TrasladoDR(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiTrasladoDR(...elementAttributes: Record<string, unknown>[]): this {
    for (const attributes of elementAttributes) {
      this.addTrasladoDR(attributes);
    }

    return this;
  }
}
