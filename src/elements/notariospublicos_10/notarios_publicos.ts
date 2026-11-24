import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import type { DatosAdquirienteAttributes } from './datos_adquiriente';
import type { DatosEnajenanteAttributes } from './datos_enajenante';
import type { DatosNotarioAttributes } from './datos_notario';
import type { DatosOperacionAttributes } from './datos_operacion';
import AbstractElement from '../../common/abstract_element';
import { DatosAdquiriente } from './datos_adquiriente';
import { DatosEnajenante } from './datos_enajenante';
import { DatosNotario } from './datos_notario';
import { DatosOperacion } from './datos_operacion';
import { DescInmuebles } from './desc_inmuebles';

export type NotariosPublicosAttributes = 'Version';

export class NotariosPublicos extends AbstractElement<NotariosPublicosAttributes> {
  public getElementName(): string {
    return 'notariospublicos:NotariosPublicos';
  }

  public getChildrenOrder(): string[] {
    return [
      'notariospublicos:DescInmuebles',
      'notariospublicos:DatosOperacion',
      'notariospublicos:DatosNotario',
      'notariospublicos:DatosEnajenante',
      'notariospublicos:DatosAdquiriente',
    ];
  }

  public getFixedAttributes(): Record<string, string> {
    return {
      'xmlns:notariospublicos': 'http://www.sat.gob.mx/notariospublicos',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xsi:schemaLocation':
          'http://www.sat.gob.mx/notariospublicos http://www.sat.gob.mx/sitio_internet/cfd/notariospublicos/notariospublicos.xsd',
      'Version': '1.0',
    };
  }

  public getDescInmuebles(): DescInmuebles {
    return this.helperGetOrAdd(new DescInmuebles());
  }

  public addDescInmuebles(attributes: AttributesRecord = {}): DescInmuebles {
    const subject = this.getDescInmuebles();
    subject.addAttributes(attributes);

    return subject;
  }

  public getDatosOperacion(): DatosOperacion {
    return this.helperGetOrAdd(new DatosOperacion());
  }

  public addDatosOperacion(attributes: AttributesRecord<DatosOperacionAttributes> = {}): DatosOperacion {
    const subject = this.getDatosOperacion();
    subject.addAttributes(attributes);

    return subject;
  }

  public getDatosNotario(): DatosNotario {
    return this.helperGetOrAdd(new DatosNotario());
  }

  public addDatosNotario(attributes: AttributesRecord<DatosNotarioAttributes> = {}): DatosNotario {
    const subject = this.getDatosNotario();
    subject.addAttributes(attributes);

    return subject;
  }

  public getDatosEnajenante(): DatosEnajenante {
    return this.helperGetOrAdd(new DatosEnajenante());
  }

  public addDatosEnajenante(attributes: AttributesRecord<DatosEnajenanteAttributes> = {}): DatosEnajenante {
    const subject = this.getDatosEnajenante();
    subject.addAttributes(attributes);

    return subject;
  }

  public getDatosAdquiriente(): DatosAdquiriente {
    return this.helperGetOrAdd(new DatosAdquiriente());
  }

  public addDatosAdquiriente(attributes: AttributesRecord<DatosAdquirienteAttributes> = {}): DatosAdquiriente {
    const subject = this.getDatosAdquiriente();
    subject.addAttributes(attributes);

    return subject;
  }
}
