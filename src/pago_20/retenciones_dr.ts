import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import type { RetencionDRAttributes } from './retencion_dr';
import AbstractElement from '../common/abstract_element';
import RetencionDR from './retencion_dr';

export default class RetencionesDR extends AbstractElement {
  public getElementName(): string {
    return 'pago20:RetencionesDR';
  }

  public addRetencionDR(attributes: AttributesRecord<RetencionDRAttributes> = {}): RetencionDR {
    const subject = new RetencionDR(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiRetencionDR(...elementAttributes: AttributesRecord<RetencionDRAttributes>[]): this {
    for (const attributes of elementAttributes) {
      this.addRetencionDR(attributes);
    }

    return this;
  }
}
