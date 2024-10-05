import { Mixin } from 'ts-mixer';
import Domicilio from '#src/cartaporte_31/domicilio';
import AbstractElement from '#src/common/abstract_element';

export default class Ubicacion extends Mixin(AbstractElement) {
  public getElementName(): string {
    return 'cartaporte31:Ubicacion';
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
