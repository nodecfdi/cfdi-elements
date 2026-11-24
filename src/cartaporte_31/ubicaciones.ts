import AbstractElement from '../common/abstract_element';
import Ubicacion from './ubicacion';

export default class Ubicaciones extends AbstractElement {
  public getElementName(): string {
    return 'cartaporte31:Ubicaciones';
  }

  public addUbicacion(attributes: Record<string, unknown> = {}): Ubicacion {
    const subject = new Ubicacion(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiUbicacion(...elementAttributes: Record<string, unknown>[]): this {
    for (const attributes of elementAttributes) {
      this.addUbicacion(attributes);
    }

    return this;
  }
}
