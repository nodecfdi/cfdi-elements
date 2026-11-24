import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import AbstractElement from '../common/abstract_element';
import ImpuestosDR from './impuestos_dr';

export type DoctoRelacionadoAttributes
  = | 'IdDocumento'
    | 'Serie'
    | 'Folio'
    | 'MonedaDR'
    | 'EquivalenciaDR'
    | 'NumParcialidad'
    | 'ImpSaldoAnt'
    | 'ImpPagado'
    | 'ImpSaldoInsoluto'
    | 'ObjetoImpDR';

export default class DoctoRelacionado extends AbstractElement<DoctoRelacionadoAttributes> {
  public getElementName(): string {
    return 'pago20:DoctoRelacionado';
  }

  public getImpuestosDR(): ImpuestosDR {
    return this.helperGetOrAdd(new ImpuestosDR());
  }

  public addImpuestosDR(attributes: AttributesRecord = {}): ImpuestosDR {
    const subject = this.getImpuestosDR();
    subject.addAttributes(attributes);

    return subject;
  }
}
