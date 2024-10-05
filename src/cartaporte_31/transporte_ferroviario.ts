import { Mixin } from 'ts-mixer';
import Carro from '#src/cartaporte_31/carro';
import DerechosDePaso from '#src/cartaporte_31/derechos_de_paso';
import AbstractElement from '#src/common/abstract_element';

export default class TransporteFerroviario extends Mixin(AbstractElement) {
  public getElementName(): string {
    return 'cartaporte31:TransporteFerroviario';
  }

  public getChildrenOrder(): string[] {
    return ['cartaporte31:DerechosDePaso', 'cartaporte31:Carro'];
  }

  public addDerechosDePaso(attributes: Record<string, unknown> = {}): DerechosDePaso {
    const subject = new DerechosDePaso(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiDerechosDePaso(...elementAttributes: Record<string, unknown>[]): this {
    for (const attributes of elementAttributes) {
      this.addDerechosDePaso(attributes);
    }

    return this;
  }

  public addCarro(attributes: Record<string, unknown> = {}): Carro {
    const subject = new Carro(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiCarro(...elementAttributes: Record<string, unknown>[]): this {
    for (const attributes of elementAttributes) {
      this.addCarro(attributes);
    }

    return this;
  }
}
