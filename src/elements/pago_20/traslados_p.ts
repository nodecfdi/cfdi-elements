import type { AttributesRecord, XmlNodeInterface } from '@nodecfdi/cfdi-core/types';
import type { TrasladoPAttributes } from './traslado_p';
import { AbstractElement } from '../../common/abstract_element';
import { TrasladoP } from './traslado_p';

export class TrasladosP extends AbstractElement {
  public getElementName(): string {
    return 'pago20:TrasladosP';
  }

  public addTrasladoP(attributes: AttributesRecord<TrasladoPAttributes> = {}, children: XmlNodeInterface[] = []): TrasladoP {
    const subject = new TrasladoP(attributes, children);
    this.addChild(subject);

    return subject;
  }

  public multiTrasladoP(...elementAttributes: AttributesRecord<TrasladoPAttributes>[]): this {
    for (const attributes of elementAttributes) {
      this.addTrasladoP(attributes);
    }

    return this;
  }
}
