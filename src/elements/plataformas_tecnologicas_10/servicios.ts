import type { AttributesRecord, XmlNodeInterface } from '@nodecfdi/cfdi-core/types';
import type { DetallesDelServicioAttributes } from './detalles_del_servicio';
import { AbstractElement } from '../../common/abstract_element';
import { DetallesDelServicio } from './detalles_del_servicio';

export class Servicios extends AbstractElement {
  public getElementName(): string {
    return 'plataformasTecnologicas:Servicios';
  }

  public addDetallesDelServicio(attributes: AttributesRecord<DetallesDelServicioAttributes> = {}, children: XmlNodeInterface[] = []): DetallesDelServicio {
    const subject = new DetallesDelServicio(attributes, children);
    this.addChild(subject);

    return subject;
  }

  public multiDetallesDelServicio(...elementAttributes: AttributesRecord<DetallesDelServicioAttributes>[]): this {
    for (const attributes of elementAttributes) {
      this.addDetallesDelServicio(attributes);
    }

    return this;
  }
}
