import { Mixin } from 'ts-mixer';
import InformacionAduanera from '#src/cfdi_40/informacion_aduanera';
import AbstractElement from '#src/common/abstract_element';

export default class Parte extends Mixin(AbstractElement) {
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
