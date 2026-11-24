import AbstractElement from '../common/abstract_element';
import Retenciones from './retenciones';
import Traslados from './traslados';

export default class Impuestos extends AbstractElement {
  public getElementName(): string {
    return 'cfdi:Impuestos';
  }

  public getChildrenOrder(): string[] {
    return [
      'cfdi:Retenciones',
      'cfdi:Traslados',
    ];
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
