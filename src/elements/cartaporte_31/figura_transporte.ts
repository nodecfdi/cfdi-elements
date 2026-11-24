import type { AttributesRecord, XmlNodeInterface } from '@nodecfdi/cfdi-core/types';
import type { TiposFiguraAttributes } from './tipos_figura';
import { AbstractElement } from '../../common/abstract_element';
import { TiposFigura } from './tipos_figura';

export class FiguraTransporte extends AbstractElement {
  public getElementName(): string {
    return 'cartaporte31:FiguraTransporte';
  }

  public addTiposFigura(attributes: AttributesRecord<TiposFiguraAttributes> = {}, children: XmlNodeInterface[] = []): TiposFigura {
    const subject = new TiposFigura(attributes, children);
    this.addChild(subject);

    return subject;
  }

  public multiTiposFigura(...elementAttributes: AttributesRecord<TiposFiguraAttributes>[]): this {
    for (const attributes of elementAttributes) {
      this.addTiposFigura(attributes);
    }

    return this;
  }
}
