import type { AttributesRecord, XmlNodeInterface } from '@nodecfdi/cfdi-core/types';
import type { CarroAttributes } from './carro';
import type { DerechosDePasoAttributes } from './derechos_de_paso';
import { AbstractElement } from '../../common/abstract_element';
import { Carro } from './carro';
import { DerechosDePaso } from './derechos_de_paso';

export type TransporteFerroviarioAttributes = 'TipoDeServicio' | 'TipoDeTrafico' | 'NombreAseg' | 'NumPolizaSeguro';

export class TransporteFerroviario extends AbstractElement<TransporteFerroviarioAttributes> {
  public getElementName(): string {
    return 'cartaporte31:TransporteFerroviario';
  }

  public getChildrenOrder(): string[] {
    return [
      'cartaporte31:DerechosDePaso',
      'cartaporte31:Carro',
    ];
  }

  public addDerechosDePaso(attributes: AttributesRecord<DerechosDePasoAttributes> = {}, children: XmlNodeInterface[] = []): DerechosDePaso {
    const subject = new DerechosDePaso(attributes, children);
    this.addChild(subject);

    return subject;
  }

  public multiDerechosDePaso(...elementAttributes: AttributesRecord<DerechosDePasoAttributes>[]): this {
    for (const attributes of elementAttributes) {
      this.addDerechosDePaso(attributes);
    }

    return this;
  }

  public addCarro(attributes: AttributesRecord<CarroAttributes> = {}, children: XmlNodeInterface[] = []): Carro {
    const subject = new Carro(attributes, children);
    this.addChild(subject);

    return subject;
  }

  public multiCarro(...elementAttributes: AttributesRecord<CarroAttributes>[]): this {
    for (const attributes of elementAttributes) {
      this.addCarro(attributes);
    }

    return this;
  }
}
