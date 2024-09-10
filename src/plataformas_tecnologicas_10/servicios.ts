import { Mixin } from 'ts-mixer';
import AbstractElement from '#src/common/abstract_element';
import DetallesDelServicio from '#src/plataformas_tecnologicas_10/detalles_del_servicio';

export default class Servicios extends Mixin(AbstractElement) {
  public getElementName(): string {
    return 'plataformasTecnologicas:Servicios';
  }

  public addDetallesDelServicio(attributes: Record<string, unknown> = {}): DetallesDelServicio {
    const subject = new DetallesDelServicio(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiDetallesDelServicio(...elementAttributes: Record<string, unknown>[]): this {
    for (const attributes of elementAttributes) {
      this.addDetallesDelServicio(attributes);
    }

    return this;
  }
}
