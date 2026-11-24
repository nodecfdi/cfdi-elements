import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import type { RetencionPAttributes } from './retencion_p';
import AbstractElement from '../common/abstract_element';
import RetencionP from './retencion_p';

export default class RetencionesP extends AbstractElement {
  public getElementName(): string {
    return 'pago20:RetencionesP';
  }

  public addRetencionP(attributes: AttributesRecord<RetencionPAttributes> = {}): RetencionP {
    const subject = new RetencionP(attributes);
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
