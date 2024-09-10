import { Mixin } from 'ts-mixer';
import AbstractElement from '#src/common/abstract_element';
import ComisionDelServicio from '#src/plataformas_tecnologicas_10/comision_del_servicio';
import ContribucionGubernamental from '#src/plataformas_tecnologicas_10/contribucion_gubernamental';
import ImpuestosTrasladadosdelServicio from '#src/plataformas_tecnologicas_10/impuestos_trasladadosdel_servicio';

export default class DetallesDelServicio extends Mixin(AbstractElement) {
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

  public addImpuestosTrasladadosdelServicio(
    attributes: Record<string, unknown> = {},
  ): ImpuestosTrasladadosdelServicio {
    const subject = this.getImpuestosTrasladadosdelServicio();
    subject.addAttributes(attributes);

    return subject;
  }

  public getContribucionGubernamental(): ContribucionGubernamental {
    return this.helperGetOrAdd(new ContribucionGubernamental());
  }

  public addContribucionGubernamental(
    attributes: Record<string, unknown> = {},
  ): ContribucionGubernamental {
    const subject = this.getContribucionGubernamental();
    subject.addAttributes(attributes);

    return subject;
  }

  public getComisionDelServicio(): ComisionDelServicio {
    return this.helperGetOrAdd(new ComisionDelServicio());
  }

  public addComisionDelServicio(attributes: Record<string, unknown> = {}): ComisionDelServicio {
    const subject = this.getComisionDelServicio();
    subject.addAttributes(attributes);

    return subject;
  }
}
