import { Mixin } from 'ts-mixer';
import AbstractElement from '../common/abstract_element';
import CfdiRelacionado from './cfdi_relacionado';

export default class CfdiRelacionados extends Mixin(AbstractElement) {
  public getElementName(): string {
    return 'cfdi:CfdiRelacionados';
  }

  public addCfdiRelacionado(attributes: Record<string, unknown> = {}): CfdiRelacionado {
    const subject = new CfdiRelacionado(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiCfdiRelacionado(...elementAttributes: Record<string, unknown>[]): this {
    for (const attributes of elementAttributes) {
      this.addCfdiRelacionado(attributes);
    }

    return this;
  }
}
