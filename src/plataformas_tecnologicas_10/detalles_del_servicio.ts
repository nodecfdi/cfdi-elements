import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import type { ComisionDelServicioAttributes } from './comision_del_servicio';
import type { ContribucionGubernamentalAttributes } from './contribucion_gubernamental';
import type { ImpuestosTrasladadosdelServicioAttributes } from './impuestos_trasladadosdel_servicio';
import AbstractElement from '../common/abstract_element';
import ComisionDelServicio from './comision_del_servicio';
import ContribucionGubernamental from './contribucion_gubernamental';
import ImpuestosTrasladadosdelServicio from './impuestos_trasladadosdel_servicio';

export type DetallesDelServicioAttributes
  = | 'FormaPagoServ'
    | 'TipoDeServ'
    | 'SubTipServ'
    | 'RFCTerceroAutorizado'
    | 'FechaServ'
    | 'PrecioServSinIVA';

export default class DetallesDelServicio extends AbstractElement<DetallesDelServicioAttributes> {
  public getElementName(): string {
    return 'plataformasTecnologicas:DetallesDelServicio';
  }

  public getChildrenOrder(): string[] {
    return [
      'plataformasTecnologicas:ImpuestosTrasladadosdelServicio',
      'plataformasTecnologicas:ContribucionGubernamental',
      'plataformasTecnologicas:ComisionDelServicio',
    ];
  }

  public getImpuestosTrasladadosdelServicio(): ImpuestosTrasladadosdelServicio {
    return this.helperGetOrAdd(new ImpuestosTrasladadosdelServicio());
  }

  public addImpuestosTrasladadosdelServicio(attributes: AttributesRecord<ImpuestosTrasladadosdelServicioAttributes> = {}): ImpuestosTrasladadosdelServicio {
    const subject = this.getImpuestosTrasladadosdelServicio();
    subject.addAttributes(attributes);

    return subject;
  }

  public getContribucionGubernamental(): ContribucionGubernamental {
    return this.helperGetOrAdd(new ContribucionGubernamental());
  }

  public addContribucionGubernamental(attributes: AttributesRecord<ContribucionGubernamentalAttributes> = {}): ContribucionGubernamental {
    const subject = this.getContribucionGubernamental();
    subject.addAttributes(attributes);

    return subject;
  }

  public getComisionDelServicio(): ComisionDelServicio {
    return this.helperGetOrAdd(new ComisionDelServicio());
  }

  public addComisionDelServicio(attributes: AttributesRecord<ComisionDelServicioAttributes> = {}): ComisionDelServicio {
    const subject = this.getComisionDelServicio();
    subject.addAttributes(attributes);

    return subject;
  }
}
