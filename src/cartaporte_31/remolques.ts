import { Mixin } from 'ts-mixer';
import Remolque from './remolque';
import AbstractElement from '../common/abstract_element';

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
