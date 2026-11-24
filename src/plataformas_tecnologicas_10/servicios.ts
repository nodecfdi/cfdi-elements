import AbstractElement from '../common/abstract_element';
import DetallesDelServicio from './detalles_del_servicio';

export default class Servicios extends AbstractElement {
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
