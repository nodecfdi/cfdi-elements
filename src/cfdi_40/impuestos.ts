import { Mixin } from 'ts-mixer';
import Retenciones from '#src/cfdi_40/retenciones';
import Traslados from '#src/cfdi_40/traslados';
import AbstractElement from '#src/common/abstract_element';

export default class Impuestos extends Mixin(AbstractElement) {
  public getElementName(): string {
    return 'cfdi:Impuestos';
  }

  public getChildrenOrder(): string[] {
    return ['cfdi:Retenciones', 'cfdi:Traslados'];
  }

  public getRetenciones(): Retenciones {
    return this.helperGetOrAdd(new Retenciones());
  }

  public addRetenciones(attributes: Record<string, unknown> = {}): Retenciones {
    const subject = this.getRetenciones();
    subject.addAttributes(attributes);

    return subject;
  }

  public getTraslados(): Traslados {
    return this.helperGetOrAdd(new Traslados());
  }

  public addTraslados(attributes: Record<string, unknown> = {}): Traslados {
    const subject = this.getTraslados();
    subject.addAttributes(attributes);

    return subject;
  }
}
