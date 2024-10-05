import { Mixin } from 'ts-mixer';
import Remolque from '#src/cartaporte_31/remolque';
import AbstractElement from '#src/common/abstract_element';

export default class Remolques extends Mixin(AbstractElement) {
  public getElementName(): string {
    return 'cartaporte31:Remolques';
  }

  public addRemolque(attributes: Record<string, unknown> = {}): Remolque {
    const subject = new Remolque(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiRemolque(...elementAttributes: Record<string, unknown>[]): this {
    for (const attributes of elementAttributes) {
      this.addRemolque(attributes);
    }

    return this;
  }
}
