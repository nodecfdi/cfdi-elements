import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import type { TiposFiguraAttributes } from './tipos_figura';
import { AbstractElement } from '../../common/abstract_element';
import { TiposFigura } from './tipos_figura';

export class FiguraTransporte extends AbstractElement {
  public getElementName(): string {
    return 'cartaporte31:FiguraTransporte';
  }

  public addTiposFigura(attributes: AttributesRecord<TiposFiguraAttributes> = {}): TiposFigura {
    const subject = new TiposFigura(attributes);
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
