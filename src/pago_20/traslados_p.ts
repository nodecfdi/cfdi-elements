import AbstractElement from '../common/abstract_element';
import TrasladoP from './traslado_p';

export default class TrasladosP extends AbstractElement {
  public getElementName(): string {
    return 'pago20:TrasladosP';
  }

  public addTrasladoP(attributes: Record<string, unknown> = {}): TrasladoP {
    const subject = new TrasladoP(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiTrasladoP(...elementAttributes: Record<string, unknown>[]): this {
    for (const attributes of elementAttributes) {
      this.addTrasladoP(attributes);
    }

    return this;
  }
}
