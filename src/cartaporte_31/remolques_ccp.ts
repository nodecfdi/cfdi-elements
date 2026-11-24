import AbstractElement from '../common/abstract_element';
import RemolqueCCP from './remolque_ccp';

export default class RemolquesCCP extends AbstractElement {
  public getElementName(): string {
    return 'cartaporte31:RemolquesCCP';
  }

  public addRemolqueCCP(attributes: Record<string, unknown> = {}): RemolqueCCP {
    const subject = new RemolqueCCP(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiRemolqueCCP(...elementAttributes: Record<string, unknown>[]): this {
    for (const attributes of elementAttributes) {
      this.addRemolqueCCP(attributes);
    }

    return this;
  }
}
