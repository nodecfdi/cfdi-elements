import AbstractElement from '../common/abstract_element';
import Contenedor from './contenedor_maritimo';

export default class TransporteMaritimo extends AbstractElement {
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
