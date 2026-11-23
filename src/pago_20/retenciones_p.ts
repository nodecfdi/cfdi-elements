import { Mixin } from 'ts-mixer';
import AbstractElement from '../common/abstract_element';
import RetencionP from './retencion_p';

export default class RetencionesP extends Mixin(AbstractElement) {
  public getElementName(): string {
    return 'pago20:RetencionesP';
  }

  public addRetencionP(attributes: Record<string, unknown> = {}): RetencionP {
    const subject = new RetencionP(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiRetencionP(...elementAttributes: Record<string, unknown>[]): this {
    for (const attributes of elementAttributes) {
      this.addRetencionP(attributes);
    }

    return this;
  }
}
