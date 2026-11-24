import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import { AbstractElement } from '../../common/abstract_element';
import { Servicios } from './servicios';

export type ServiciosPlataformasTecnologicasAttributes
  = | 'Version'
    | 'Periodicidad'
    | 'NumServ'
    | 'MonTotServSIVA'
    | 'TotalIVATrasladado'
    | 'TotalIVARetenido'
    | 'TotalISRRetenido'
    | 'DifIVAEntregadoPrestServ'
    | 'MonTotalporUsoPlataforma'
    | 'MonTotalContribucionGubernamental';

export class ServiciosPlataformasTecnologicas extends AbstractElement<ServiciosPlataformasTecnologicasAttributes> {
  public getElementName(): string {
    return 'plataformasTecnologicas:ServiciosPlataformasTecnologicas';
  }

  public getFixedAttributes(): Record<string, string> {
    return {
      'xmlns:plataformasTecnologicas': 'http://www.sat.gob.mx/esquemas/retencionpago/1/PlataformasTecnologicas10',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xsi:schemaLocation':
          'http://www.sat.gob.mx/esquemas/retencionpago/1/PlataformasTecnologicas10 http://www.sat.gob.mx/esquemas/retencionpago/1/PlataformasTecnologicas10/ServiciosPlataformasTecnologicas10.xsd',
      'Version': '1.0',
    };
  }

  public getServicios(): Servicios {
    return this.helperGetOrAdd(new Servicios());
  }

  public addServicios(attributes: AttributesRecord = {}): Servicios {
    const subject = this.getServicios();
    subject.addAttributes(attributes);

    return subject;
  }
}
