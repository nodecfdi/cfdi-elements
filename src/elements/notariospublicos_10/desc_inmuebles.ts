import type { AttributesRecord, XmlNodeInterface } from '@nodecfdi/cfdi-core/types';
import type { DescInmuebleAttributes } from './desc_inmueble';
import { AbstractElement } from '../../common/abstract_element';
import { DescInmueble } from './desc_inmueble';

export class DescInmuebles extends AbstractElement {
  public getElementName(): string {
    return 'notariospublicos:DescInmuebles';
  }

  public addDescInmueble(attributes: AttributesRecord<DescInmuebleAttributes> = {}, children: XmlNodeInterface[] = []): DescInmueble {
    const subject = new DescInmueble(attributes, children);
    this.addChild(subject);

    return subject;
  }

  public multiDescInmueble(...elementAttributes: AttributesRecord<DescInmuebleAttributes>[]): this {
    for (const attributes of elementAttributes) {
      this.addDescInmueble(attributes);
    }

    return this;
  }
}
