import type { AttributesRecord, XmlNodeInterface } from '@nodecfdi/cfdi-core/types';
import type { IncapacidadAttributes } from './incapacidad';
import { AbstractElement } from '../../common/abstract_element';
import { Incapacidad } from './incapacidad';

export class Incapacidades extends AbstractElement {
  public getElementName(): string {
    return 'nomina12:Incapacidades';
  }

  public addIncapacidad(attributes: AttributesRecord<IncapacidadAttributes> = {}, children: XmlNodeInterface[] = []): Incapacidad {
    const subject = new Incapacidad(attributes, children);
    this.addChild(subject);

    return subject;
  }

  public multiIncapacidad(...elementAttributes: AttributesRecord<IncapacidadAttributes>[]): this {
    for (const attributes of elementAttributes) {
      this.addIncapacidad(attributes);
    }

    return this;
  }
}
