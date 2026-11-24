import type { AttributesRecord, XmlNodeInterface } from '@nodecfdi/cfdi-core/types';
import type { RetencionAttributes } from './retencion';
import { AbstractElement } from '../../common/abstract_element';
import { Retencion } from './retencion';

export class Retenciones extends AbstractElement {
  public getElementName(): string {
    return 'cfdi:Retenciones';
  }

  public addRetencion(attributes: AttributesRecord<RetencionAttributes> = {}, children: XmlNodeInterface[] = []): Retencion {
    const subject = new Retencion(attributes, children);
    this.addChild(subject);

    return subject;
  }

  public multiRetencion(...elementAttributes: AttributesRecord<RetencionAttributes>[]): this {
    for (const attributes of elementAttributes) {
      this.addRetencion(attributes);
    }

    return this;
  }
}
