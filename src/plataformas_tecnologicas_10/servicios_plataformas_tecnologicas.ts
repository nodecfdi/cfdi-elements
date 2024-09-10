import { Mixin } from 'ts-mixer';
import AbstractElement from '#src/common/abstract_element';
import Servicios from '#src/plataformas_tecnologicas_10/servicios';

export default class ServiciosPlataformasTecnologicas extends Mixin(AbstractElement) {
  public getElementName(): string {
    return 'plataformasTecnologicas:ServiciosPlataformasTecnologicas';
  }

  public getFixedAttributes(): Record<string, string> {
    return {
      'xmlns:plataformasTecnologicas':
        'http://www.sat.gob.mx/esquemas/retencionpago/1/PlataformasTecnologicas10',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xsi:schemaLocation':
        'http://www.sat.gob.mx/esquemas/retencionpago/1/PlataformasTecnologicas10 http://www.sat.gob.mx/esquemas/retencionpago/1/PlataformasTecnologicas10/ServiciosPlataformasTecnologicas10.xsd',
      'Version': '1.0',
    };
  }

  public getServicios(): Servicios {
    return this.helperGetOrAdd(new Servicios());
  }

  public addServicios(attributes: Record<string, unknown> = {}): Servicios {
    const subject = this.getServicios();
    subject.addAttributes(attributes);

    return subject;
  }
}
