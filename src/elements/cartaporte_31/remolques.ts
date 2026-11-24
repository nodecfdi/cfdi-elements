import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import type { RemolqueAttributes } from './remolque';
import { AbstractElement } from '../../common/abstract_element';
import { Remolque } from './remolque';

export class Remolques extends AbstractElement {
  public getElementName(): string {
    return 'cartaporte31:Remolques';
  }

  public addRemolque(attributes: AttributesRecord<RemolqueAttributes> = {}): Remolque {
    const subject = new Remolque(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiRemolque(...elementAttributes: AttributesRecord<RemolqueAttributes>[]): this {
    for (const attributes of elementAttributes) {
      this.addRemolque(attributes);
    }

    return this;
  }
}
