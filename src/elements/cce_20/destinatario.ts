import type { AttributesRecord, XmlNodeInterface } from '@nodecfdi/cfdi-core/types';
import type { DomicilioAttributes } from './domicilio';
import { AbstractElement } from '../../common/abstract_element';
import { Domicilio } from './domicilio';

export type DestinatarioAttributes = 'NumRegIdTrib' | 'Nombre';

export class Destinatario extends AbstractElement<DestinatarioAttributes> {
  public getElementName(): string {
    return 'cce20:Destinatario';
  }

  public addDomicilio(attributes: AttributesRecord<DomicilioAttributes> = {}, children: XmlNodeInterface[] = []): Domicilio {
    const subject = new Domicilio(attributes, children);
    this.addChild(subject);

    return subject;
  }

  public multiDomicilio(...elementAttributes: AttributesRecord<DomicilioAttributes>[]): this {
    for (const attributes of elementAttributes) {
      this.addDomicilio(attributes);
    }

    return this;
  }
}
