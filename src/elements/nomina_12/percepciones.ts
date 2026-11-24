import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import type { JubilacionPensionRetiroAttributes } from './jubilacion_pension_retiro';
import type { PercepcionAttributes } from './percepcion';
import type { SeparacionIndemnizacionAttributes } from './separacion_indemnizacion';
import AbstractElement from '../../common/abstract_element';
import { JubilacionPensionRetiro } from './jubilacion_pension_retiro';
import { Percepcion } from './percepcion';
import { SeparacionIndemnizacion } from './separacion_indemnizacion';

export type PercepcionesAttributes
  = | 'TotalSueldos'
    | 'TotalSeparacionIndemnizacion'
    | 'TotalJubilacionPensionRetiro'
    | 'TotalGravado'
    | 'TotalExento';

export class Percepciones extends AbstractElement<PercepcionesAttributes> {
  public getElementName(): string {
    return 'nomina12:Percepciones';
  }

  public getChildrenOrder(): string[] {
    return [
      'nomina12:Percepcion',
      'nomina12:JubilacionPensionRetiro',
      'nomina12:SeparacionIndemnizacion',
    ];
  }

  public addPercepcion(attributes: AttributesRecord<PercepcionAttributes> = {}): Percepcion {
    const subject = new Percepcion(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiPercepcion(...elementAttributes: AttributesRecord<PercepcionAttributes>[]): this {
    for (const attributes of elementAttributes) {
      this.addPercepcion(attributes);
    }

    return this;
  }

  public getJubilacionPensionRetiro(): JubilacionPensionRetiro {
    return this.helperGetOrAdd(new JubilacionPensionRetiro());
  }

  public addJubilacionPensionRetiro(attributes: AttributesRecord<JubilacionPensionRetiroAttributes> = {}): JubilacionPensionRetiro {
    const subject = this.getJubilacionPensionRetiro();
    subject.addAttributes(attributes);

    return subject;
  }

  public getSeparacionIndemnizacion(): SeparacionIndemnizacion {
    return this.helperGetOrAdd(new SeparacionIndemnizacion());
  }

  public addSeparacionIndemnizacion(attributes: AttributesRecord<SeparacionIndemnizacionAttributes> = {}): SeparacionIndemnizacion {
    const subject = this.getSeparacionIndemnizacion();
    subject.addAttributes(attributes);

    return subject;
  }
}
