import { Mixin } from 'ts-mixer';
import Ubicacion from '#src/cartaporte_31/ubicacion';
import AbstractElement from '#src/common/abstract_element';

export default class Ubicaciones extends Mixin(AbstractElement) {
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
