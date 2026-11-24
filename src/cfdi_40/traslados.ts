import AbstractElement from '../common/abstract_element';
import Traslado from './traslado';

export default class Traslados extends AbstractElement {
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
