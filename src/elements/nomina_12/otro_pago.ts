import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import type { CompensacionSaldosAFavorAttributes } from './compensacion_saldos_a_favor';
import type { SubsidioAlEmpleoAttributes } from './subsidio_al_empleo';
import AbstractElement from '../../common/abstract_element';
import { CompensacionSaldosAFavor } from './compensacion_saldos_a_favor';
import { SubsidioAlEmpleo } from './subsidio_al_empleo';

export type OtroPagoAttributes = 'TipoOtroPago' | 'Clave' | 'Concepto' | 'Importe';

export class OtroPago extends AbstractElement<OtroPagoAttributes> {
  public getElementName(): string {
    return 'nomina12:OtroPago';
  }

  public getChildrenOrder(): string[] {
    return [
      'nomina12:SubsidioAlEmpleo',
      'nomina12:CompensacionSaldosAFavor',
    ];
  }

  public getSubsidioAlEmpleo(): SubsidioAlEmpleo {
    return this.helperGetOrAdd(new SubsidioAlEmpleo());
  }

  public addSubsidioAlEmpleo(attributes: AttributesRecord<SubsidioAlEmpleoAttributes> = {}): SubsidioAlEmpleo {
    const subject = this.getSubsidioAlEmpleo();
    subject.addAttributes(attributes);

    return subject;
  }

  public getCompensacionSaldosAFavor(): CompensacionSaldosAFavor {
    return this.helperGetOrAdd(new CompensacionSaldosAFavor());
  }

  public addCompensacionSaldosAFavor(attributes: AttributesRecord<CompensacionSaldosAFavorAttributes> = {}): CompensacionSaldosAFavor {
    const subject = this.getCompensacionSaldosAFavor();
    subject.addAttributes(attributes);

    return subject;
  }
}
