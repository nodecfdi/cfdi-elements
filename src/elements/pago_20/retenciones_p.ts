import type { AttributesRecord, XmlNodeInterface } from '@nodecfdi/cfdi-core/types';
import type { RetencionPAttributes } from './retencion_p';
import { AbstractElement } from '../../common/abstract_element';
import { RetencionP } from './retencion_p';

export class RetencionesP extends AbstractElement {
  public getElementName(): string {
    return 'pago20:RetencionesP';
  }

  public addRetencionP(attributes: AttributesRecord<RetencionPAttributes> = {}, children: XmlNodeInterface[] = []): RetencionP {
    const subject = new RetencionP(attributes, children);
    this.addChild(subject);

    return subject;
  }

  public multiRetencionP(...elementAttributes: AttributesRecord<RetencionPAttributes>[]): this {
    for (const attributes of elementAttributes) {
      this.addRetencionP(attributes);
    }

    return this;
  }
}
