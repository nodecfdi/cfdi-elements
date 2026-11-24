import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import AbstractElement from '../common/abstract_element';
import { RetencionesDR } from './retenciones_dr';
import { TrasladosDR } from './traslados_dr';

export class ImpuestosDR extends AbstractElement {
  public getElementName(): string {
    return 'pago20:ImpuestosDR';
  }

  public getChildrenOrder(): string[] {
    return [
      'pago20:RetencionesDR',
      'pago20:TrasladosDR',
    ];
  }

  public getRetencionesDR(): RetencionesDR {
    return this.helperGetOrAdd(new RetencionesDR());
  }

  public addRetencionesDR(attributes: AttributesRecord = {}): RetencionesDR {
    const subject = this.getRetencionesDR();
    subject.addAttributes(attributes);

    return subject;
  }

  public getTrasladosDR(): TrasladosDR {
    return this.helperGetOrAdd(new TrasladosDR());
  }

  public addTrasladosDR(attributes: AttributesRecord = {}): TrasladosDR {
    const subject = this.getTrasladosDR();
    subject.addAttributes(attributes);

    return subject;
  }
}
