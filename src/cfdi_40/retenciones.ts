import AbstractElement from '../common/abstract_element';
import Retencion from './retencion';

export default class Retenciones extends AbstractElement {
  public getElementName(): string {
    return 'cfdi:Retenciones';
  }

  public addRetencion(attributes: Record<string, unknown> = {}): Retencion {
    const subject = new Retencion(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiRetencion(...elementAttributes: Record<string, unknown>[]): this {
    for (const attributes of elementAttributes) {
      this.addRetencion(attributes);
    }

    return this;
  }
}
