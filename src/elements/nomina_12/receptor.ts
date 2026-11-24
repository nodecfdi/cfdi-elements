import type { AttributesRecord, XmlNodeInterface } from '@nodecfdi/cfdi-core/types';
import type { SubContratacionAttributes } from './sub_contratacion';
import { AbstractElement } from '../../common/abstract_element';
import { SubContratacion } from './sub_contratacion';

export type ReceptorAttributes
  = | 'Curp'
    | 'NumSeguridadSocial'
    | 'FechaInicioRelLaboral'
    | 'Antigüedad'
    | 'TipoContrato'
    | 'Sindicalizado'
    | 'TipoJornada'
    | 'TipoRegimen'
    | 'NumEmpleado'
    | 'Departamento'
    | 'Puesto'
    | 'RiesgoPuesto'
    | 'PeriodicidadPago'
    | 'Banco'
    | 'CuentaBancaria'
    | 'SalarioBaseCotApor'
    | 'SalarioDiarioIntegrado'
    | 'ClaveEntFed';

export class Receptor extends AbstractElement<ReceptorAttributes> {
  public getElementName(): string {
    return 'nomina12:Receptor';
  }

  public addSubContratacion(attributes: AttributesRecord<SubContratacionAttributes> = {}, children: XmlNodeInterface[] = []): SubContratacion {
    const subject = new SubContratacion(attributes, children);
    this.addChild(subject);

    return subject;
  }

  public multiSubContratacion(...elementAttributes: AttributesRecord<SubContratacionAttributes>[]): this {
    for (const attributes of elementAttributes) {
      this.addSubContratacion(attributes);
    }

    return this;
  }
}
