import AbstractElement from '../common/abstract_element';
import TiposFigura from './tipos_figura';

export default class FiguraTransporte extends AbstractElement {
  public getElementName(): string {
    return 'cartaporte31:FiguraTransporte';
  }

  public addTiposFigura(attributes: Record<string, unknown> = {}): TiposFigura {
    const subject = new TiposFigura(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiTiposFigura(...elementAttributes: Record<string, unknown>[]): this {
    for (const attributes of elementAttributes) {
      this.addTiposFigura(attributes);
    }

    return this;
  }
}
