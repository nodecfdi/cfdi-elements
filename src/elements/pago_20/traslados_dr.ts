import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import type { TrasladoDRAttributes } from './traslado_dr';
import AbstractElement from '../../common/abstract_element';
import { TrasladoDR } from './traslado_dr';

export class TrasladosDR extends AbstractElement {
  public getElementName(): string {
    return 'pago20:TrasladosDR';
  }

  public addTrasladoDR(attributes: AttributesRecord<TrasladoDRAttributes> = {}): TrasladoDR {
    const subject = new TrasladoDR(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiTrasladoDR(...elementAttributes: AttributesRecord<TrasladoDRAttributes>[]): this {
    for (const attributes of elementAttributes) {
      this.addTrasladoDR(attributes);
    }

    return this;
  }
}
