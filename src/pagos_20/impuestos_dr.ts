import { Mixin } from 'ts-mixer';
import AbstractElement from '#src/common/abstract_element';
import RetencionesDR from '#src/pagos_20/retenciones_dr';
import TrasladosDR from '#src/pagos_20/traslados_dr';

export default class ImpuestosDR extends Mixin(AbstractElement) {
  public getElementName(): string {
    return 'pago20:ImpuestosDR';
  }

  public getChildrenOrder(): string[] {
    return ['pago20:RetencionesDR', 'pago20:TrasladosDR'];
  }

  public getRetencionesDR(): RetencionesDR {
    return this.helperGetOrAdd(new RetencionesDR());
  }

  public addRetencionesDR(attributes: Record<string, unknown> = {}): RetencionesDR {
    const subject = this.getRetencionesDR();
    subject.addAttributes(attributes);

    return subject;
  }

  public getTrasladosDR(): TrasladosDR {
    return this.helperGetOrAdd(new TrasladosDR());
  }

  public addTrasladosDR(attributes: Record<string, unknown> = {}): TrasladosDR {
    const subject = this.getTrasladosDR();
    subject.addAttributes(attributes);

    return subject;
  }
}
