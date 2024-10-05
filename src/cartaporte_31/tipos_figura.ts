import { Mixin } from 'ts-mixer';
import Domicilio from '#src/cartaporte_31/domicilio';
import PartesTransporte from '#src/cartaporte_31/partes_transporte';
import AbstractElement from '#src/common/abstract_element';

export default class TiposFigura extends Mixin(AbstractElement) {
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
