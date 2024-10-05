import { Mixin } from 'ts-mixer';
import Contenedor from '#src/cartaporte_31/contenedor_maritimo';
import AbstractElement from '#src/common/abstract_element';

export default class TransporteMaritimo extends Mixin(AbstractElement) {
  public getElementName(): string {
    return 'cartaporte31:TransporteMaritimo';
  }

  public addContenedor(attributes: Record<string, unknown> = {}): Contenedor {
    const subject = new Contenedor(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiContenedor(...elementAttributes: Record<string, unknown>[]): this {
    for (const attributes of elementAttributes) {
      this.addContenedor(attributes);
    }

    return this;
  }
}
