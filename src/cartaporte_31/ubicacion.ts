import { Mixin } from 'ts-mixer';
import AbstractElement from '../common/abstract_element';
import Domicilio from './domicilio';

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
