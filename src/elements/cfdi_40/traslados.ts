import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import type { TrasladoAttributes } from './traslado';
import AbstractElement from '../../common/abstract_element';
import { Traslado } from './traslado';

export class Traslados extends AbstractElement {
  public getElementName(): string {
    return 'cfdi:Traslados';
  }

  public addTraslado(attributes: AttributesRecord<TrasladoAttributes> = {}): Traslado {
    const subject = new Traslado(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiTraslado(...elementAttributes: AttributesRecord<TrasladoAttributes>[]): this {
    for (const attributes of elementAttributes) {
      this.addTraslado(attributes);
    }

    return this;
  }
}
