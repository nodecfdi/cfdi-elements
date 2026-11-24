import AbstractElement from '../common/abstract_element';
import Domicilio from './domicilio';
import PartesTransporte from './partes_transporte';

export default class TiposFigura extends AbstractElement {
  public getElementName(): string {
    return 'cartaporte31:TiposFigura';
  }

  public getChildrenOrder(): string[] {
    return ['cartaporte31:PartesTransporte', 'cartaporte31:Domicilio'];
  }

  public addPartesTransporte(attributes: Record<string, unknown> = {}): PartesTransporte {
    const subject = new PartesTransporte(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiPartesTransporte(...elementAttributes: Record<string, unknown>[]): this {
    for (const attributes of elementAttributes) {
      this.addPartesTransporte(attributes);
    }

    return this;
  }

  public getDomicilio(): Domicilio {
    return this.helperGetOrAdd(new Domicilio());
  }

  public addDomicilio(attributes: Record<string, unknown> = {}): Domicilio {
    const subject = this.getDomicilio();
    subject.addAttributes(attributes);

    return subject;
  }
}
