import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import type { DeduccionesAttributes } from './deducciones';
import type { EmisorAttributes } from './emisor';
import type { PercepcionesAttributes } from './percepciones';
import type { ReceptorAttributes } from './receptor';
import AbstractElement from '../../common/abstract_element';
import { Deducciones } from './deducciones';
import { Emisor } from './emisor';
import { Incapacidades } from './incapacidades';
import { OtrosPagos } from './otros_pagos';
import { Percepciones } from './percepciones';
import { Receptor } from './receptor';

export type NominaAttributes
  = | 'Version'
    | 'TipoNomina'
    | 'FechaPago'
    | 'FechaInicialPago'
    | 'FechaFinalPago'
    | 'NumDiasPagados'
    | 'TotalPercepciones'
    | 'TotalDeducciones'
    | 'TotalOtrosPagos';

export class Nomina extends AbstractElement<NominaAttributes> {
  public getElementName(): string {
    return 'nomina12:Nomina';
  }

  public getChildrenOrder(): string[] {
    return [
      'nomina12:Emisor',
      'nomina12:Receptor',
      'nomina12:Percepciones',
      'nomina12:Deducciones',
      'nomina12:OtrosPagos',
      'nomina12:Incapacidades',
    ];
  }

  public getFixedAttributes(): Record<string, string> {
    return {
      'xmlns:nomina12': 'http://www.sat.gob.mx/nomina12',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xsi:schemaLocation':
          'http://www.sat.gob.mx/nomina12 http://www.sat.gob.mx/sitio_internet/cfd/nomina/nomina12.xsd',
      'Version': '1.2',
    };
  }

  public getEmisor(): Emisor {
    return this.helperGetOrAdd(new Emisor());
  }

  public addEmisor(attributes: AttributesRecord<EmisorAttributes> = {}): Emisor {
    const subject = this.getEmisor();
    subject.addAttributes(attributes);

    return subject;
  }

  public getReceptor(): Receptor {
    return this.helperGetOrAdd(new Receptor());
  }

  public addReceptor(attributes: AttributesRecord<ReceptorAttributes> = {}): Receptor {
    const subject = this.getReceptor();
    subject.addAttributes(attributes);

    return subject;
  }

  public getPercepciones(): Percepciones {
    return this.helperGetOrAdd(new Percepciones());
  }

  public addPercepciones(attributes: AttributesRecord<PercepcionesAttributes> = {}): Percepciones {
    const subject = this.getPercepciones();
    subject.addAttributes(attributes);

    return subject;
  }

  public getDeducciones(): Deducciones {
    return this.helperGetOrAdd(new Deducciones());
  }

  public addDeducciones(attributes: AttributesRecord<DeduccionesAttributes> = {}): Deducciones {
    const subject = this.getDeducciones();
    subject.addAttributes(attributes);

    return subject;
  }

  public getOtrosPagos(): OtrosPagos {
    return this.helperGetOrAdd(new OtrosPagos());
  }

  public addOtrosPagos(attributes: AttributesRecord = {}): OtrosPagos {
    const subject = this.getOtrosPagos();
    subject.addAttributes(attributes);

    return subject;
  }

  public getIncapacidades(): Incapacidades {
    return this.helperGetOrAdd(new Incapacidades());
  }

  public addIncapacidades(attributes: AttributesRecord = {}): Incapacidades {
    const subject = this.getIncapacidades();
    subject.addAttributes(attributes);

    return subject;
  }
}
