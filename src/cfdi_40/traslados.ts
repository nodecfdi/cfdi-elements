import { Mixin } from 'ts-mixer';
import Traslado from '#src/cfdi_40/traslado';
import AbstractElement from '#src/common/abstract_element';

export default class Traslados extends Mixin(AbstractElement) {
  public getElementName(): string {
    return 'cfdi:Traslados';
  }

  public addTraslado(attributes: Record<string, unknown> = {}): Traslado {
    const subject = new Traslado(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiTraslado(...elementAttributes: Record<string, unknown>[]): this {
    for (const attributes of elementAttributes) {
      this.addTraslado(attributes);
    }

    return this;
  }
}
