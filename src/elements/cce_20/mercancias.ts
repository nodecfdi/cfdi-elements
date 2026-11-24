import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import type { MercanciaAttributes } from './mercancia';
import AbstractElement from '../../common/abstract_element';
import { Mercancia } from './mercancia';

export class Mercancias extends AbstractElement {
  public getElementName(): string {
    return 'cce20:Mercancias';
  }

  public addMercancia(attributes: AttributesRecord<MercanciaAttributes> = {}): Mercancia {
    const subject = new Mercancia(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiMercancia(...elementAttributes: AttributesRecord<MercanciaAttributes>[]): this {
    for (const attributes of elementAttributes) {
      this.addMercancia(attributes);
    }

    return this;
  }
}
