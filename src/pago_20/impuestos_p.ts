import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import AbstractElement from '../common/abstract_element';
import RetencionesP from './retenciones_p';
import TrasladosP from './traslados_p';

export default class ImpuestosP extends AbstractElement {
  public getElementName(): string {
    return 'pago20:ImpuestosP';
  }

  public getChildrenOrder(): string[] {
    return [
      'pago20:RetencionesP',
      'pago20:TrasladosP',
    ];
  }

  public getRetencionesP(): RetencionesP {
    return this.helperGetOrAdd(new RetencionesP());
  }

  public addRetencionesP(attributes: AttributesRecord = {}): RetencionesP {
    const subject = this.getRetencionesP();
    subject.addAttributes(attributes);

    return subject;
  }

  public getTrasladosP(): TrasladosP {
    return this.helperGetOrAdd(new TrasladosP());
  }

  public addTrasladosP(attributes: AttributesRecord = {}): TrasladosP {
    const subject = this.getTrasladosP();
    subject.addAttributes(attributes);

    return subject;
  }
}
