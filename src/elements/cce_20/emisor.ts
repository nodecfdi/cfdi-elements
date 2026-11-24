import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import type { DomicilioAttributes } from './domicilio';
import { AbstractElement } from '../../common/abstract_element';
import { Domicilio } from './domicilio';

export type EmisorAttributes = 'Curp';

export class Emisor extends AbstractElement<EmisorAttributes> {
  public getElementName(): string {
    return 'cce20:Emisor';
  }

  public getDomicilio(): Domicilio {
    return this.helperGetOrAdd(new Domicilio());
  }

  public addDomicilio(attributes: AttributesRecord<DomicilioAttributes> = {}): Domicilio {
    const subject = this.getDomicilio();
    subject.addAttributes(attributes);

    return subject;
  }
}
