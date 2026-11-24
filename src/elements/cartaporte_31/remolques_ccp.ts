import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import type { RemolqueCCPAttributes } from './remolque_ccp';
import AbstractElement from '../../common/abstract_element';
import { RemolqueCCP } from './remolque_ccp';

export class RemolquesCCP extends AbstractElement {
  public getElementName(): string {
    return 'cartaporte31:RemolquesCCP';
  }

  public addRemolqueCCP(attributes: AttributesRecord<RemolqueCCPAttributes> = {}): RemolqueCCP {
    const subject = new RemolqueCCP(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiRemolqueCCP(...elementAttributes: AttributesRecord<RemolqueCCPAttributes>[]): this {
    for (const attributes of elementAttributes) {
      this.addRemolqueCCP(attributes);
    }

    return this;
  }
}
