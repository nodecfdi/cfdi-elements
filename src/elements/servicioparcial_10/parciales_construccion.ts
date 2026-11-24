import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import type { InmuebleAttributes } from './inmueble';
import AbstractElement from '../../common/abstract_element';
import { Inmueble } from './inmueble';

export type ParcialesConstruccionAttributes = 'Version' | 'NumPerLicoAut';

export class ParcialesConstruccion extends AbstractElement<ParcialesConstruccionAttributes> {
  public getElementName(): string {
    return 'servicioparcial:parcialesconstruccion';
  }

  public getFixedAttributes(): Record<string, string> {
    return {
      'xmlns:servicioparcial': 'http://www.sat.gob.mx/servicioparcialconstruccion',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xsi:schemaLocation':
          'http://www.sat.gob.mx/servicioparcialconstruccion http://www.sat.gob.mx/sitio_internet/cfd/servicioparcialconstruccion/servicioparcialconstruccion.xsd',
      'Version': '1.0',
    };
  }

  public getInmueble(): Inmueble {
    return this.helperGetOrAdd(new Inmueble());
  }

  public addInmueble(attributes: AttributesRecord<InmuebleAttributes> = {}): Inmueble {
    const subject = this.getInmueble();
    subject.addAttributes(attributes);

    return subject;
  }
}
