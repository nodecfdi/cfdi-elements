import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import AbstractElement from '../../common/abstract_element';
import { Retenciones } from './retenciones';
import { Traslados } from './traslados';

export type ImpuestosAttributes = 'TotalImpuestosRetenidos' | 'TotalImpuestosTrasladados';

export class Impuestos extends AbstractElement<ImpuestosAttributes> {
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

  public addRetenciones(attributes: AttributesRecord = {}): Retenciones {
    const subject = this.getRetenciones();
    subject.addAttributes(attributes);

    return subject;
  }

  public getTraslados(): Traslados {
    return this.helperGetOrAdd(new Traslados());
  }

  public addTraslados(attributes: AttributesRecord = {}): Traslados {
    const subject = this.getTraslados();
    subject.addAttributes(attributes);

    return subject;
  }
}
