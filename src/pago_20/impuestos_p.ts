import { Mixin } from 'ts-mixer';
import AbstractElement from '#src/common/abstract_element';
import RetencionesP from '#src/pago_20/retenciones_p';
import TrasladosP from '#src/pago_20/traslados_p';

export default class ImpuestosP extends Mixin(AbstractElement) {
  public getElementName(): string {
    return 'pago20:ImpuestosP';
  }

  public getChildrenOrder(): string[] {
    return ['pago20:RetencionesP', 'pago20:TrasladosP'];
  }

  public getRetencionesP(): RetencionesP {
    return this.helperGetOrAdd(new RetencionesP());
  }

  public addRetencionesP(attributes: Record<string, unknown> = {}): RetencionesP {
    const subject = this.getRetencionesP();
    subject.addAttributes(attributes);

    return subject;
  }

  public getTrasladosP(): TrasladosP {
    return this.helperGetOrAdd(new TrasladosP());
  }

  public addTrasladosP(attributes: Record<string, unknown> = {}): TrasladosP {
    const subject = this.getTrasladosP();
    subject.addAttributes(attributes);

    return subject;
  }
}
