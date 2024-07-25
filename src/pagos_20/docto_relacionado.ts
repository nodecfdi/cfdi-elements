import { Mixin } from 'ts-mixer';
import AbstractElement from '#src/common/abstract_element';
import ImpuestosDR from '#src/pagos_20/impuestos_dr';

export default class DoctoRelacionado extends Mixin(AbstractElement) {
  public getElementName(): string {
    return 'pago20:DoctoRelacionado';
  }

  public getImpuestosDR(): ImpuestosDR {
    return this.helperGetOrAdd(new ImpuestosDR());
  }

  public addImpuestosDR(attributes: Record<string, unknown> = {}): ImpuestosDR {
    const subject = this.getImpuestosDR();
    subject.addAttributes(attributes);

    return subject;
  }
}
