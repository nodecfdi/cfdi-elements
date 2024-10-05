import { Mixin } from 'ts-mixer';
import RegimenAduaneroCCP from '#src/cartaporte_31/regimen_aduanero_ccp';
import AbstractElement from '#src/common/abstract_element';

export default class RegimenesAduaneros extends Mixin(AbstractElement) {
  public getElementName(): string {
    return 'cartaporte31:RegimenesAduaneros';
  }

  public addRegimenAduaneroCCP(attributes: Record<string, unknown> = {}): RegimenAduaneroCCP {
    const subject = new RegimenAduaneroCCP(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiRegimenAduaneroCCP(...elementAttributes: Record<string, unknown>[]): this {
    for (const attributes of elementAttributes) {
      this.addRegimenAduaneroCCP(attributes);
    }

    return this;
  }
}
