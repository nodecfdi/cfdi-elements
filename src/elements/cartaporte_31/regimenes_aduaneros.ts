import type { AttributesRecord, XmlNodeInterface } from '@nodecfdi/cfdi-core/types';
import type { RegimenAduaneroCCPAttributes } from './regimen_aduanero_ccp';
import { AbstractElement } from '../../common/abstract_element';
import { RegimenAduaneroCCP } from './regimen_aduanero_ccp';

export class RegimenesAduaneros extends AbstractElement {
  public getElementName(): string {
    return 'cartaporte31:RegimenesAduaneros';
  }

  public addRegimenAduaneroCCP(attributes: AttributesRecord<RegimenAduaneroCCPAttributes> = {}, children: XmlNodeInterface[] = []): RegimenAduaneroCCP {
    const subject = new RegimenAduaneroCCP(attributes, children);
    this.addChild(subject);

    return subject;
  }

  public multiRegimenAduaneroCCP(...elementAttributes: AttributesRecord<RegimenAduaneroCCPAttributes>[]): this {
    for (const attributes of elementAttributes) {
      this.addRegimenAduaneroCCP(attributes);
    }

    return this;
  }
}
