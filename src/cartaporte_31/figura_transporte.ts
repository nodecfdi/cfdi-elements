import { Mixin } from 'ts-mixer';
import TiposFigura from '#src/cartaporte_31/tipos_figura';
import AbstractElement from '#src/common/abstract_element';

export default class FiguraTransporte extends Mixin(AbstractElement) {
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
