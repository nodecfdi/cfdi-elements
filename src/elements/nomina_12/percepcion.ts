import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import type { AccionesOTitulosAttributes } from './acciones_o_titulos';
import type { HorasExtraAttributes } from './horas_extra';
import { AbstractElement } from '../../common/abstract_element';
import { AccionesOTitulos } from './acciones_o_titulos';
import { HorasExtra } from './horas_extra';

export type PercepcionAttributes
  = | 'TipoPercepcion'
    | 'Clave'
    | 'Concepto'
    | 'ImporteGravado'
    | 'ImporteExento';

export class Percepcion extends AbstractElement<PercepcionAttributes> {
  public getElementName(): string {
    return 'nomina12:Percepcion';
  }

  public getChildrenOrder(): string[] {
    return [
      'nomina12:AccionesOTitulos',
      'nomina12:HorasExtra',
    ];
  }

  public getAccionesOTitulos(): AccionesOTitulos {
    return this.helperGetOrAdd(new AccionesOTitulos());
  }

  public addAccionesOTitulos(attributes: AttributesRecord<AccionesOTitulosAttributes> = {}): AccionesOTitulos {
    const subject = this.getAccionesOTitulos();
    subject.addAttributes(attributes);

    return subject;
  }

  public addHorasExtra(attributes: AttributesRecord<HorasExtraAttributes> = {}): HorasExtra {
    const subject = new HorasExtra(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiHorasExtra(...elementAttributes: AttributesRecord<HorasExtraAttributes>[]): this {
    for (const attributes of elementAttributes) {
      this.addHorasExtra(attributes);
    }

    return this;
  }
}
