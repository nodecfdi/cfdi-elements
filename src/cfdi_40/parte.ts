import AbstractElement from '../common/abstract_element';
import InformacionAduanera from './informacion_aduanera';

export default class Parte extends AbstractElement {
  public getElementName(): string {
    return 'cfdi:Parte';
  }

  public addInformacionAduanera(attributes: Record<string, unknown> = {}): InformacionAduanera {
    const subject = new InformacionAduanera(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiInformacionAduanera(...elementAttributes: Record<string, unknown>[]): this {
    for (const attributes of elementAttributes) {
      this.addInformacionAduanera(attributes);
    }

    return this;
  }
}
