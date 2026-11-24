import type { AttributesRecord, XmlNodeInterface } from '@nodecfdi/cfdi-core/types';
import type { ContenedorFerroviarioAttributes } from './contenedor_ferroviario';
import { AbstractElement } from '../../common/abstract_element';
import { ContenedorFerroviario } from './contenedor_ferroviario';

export type CarroAttributes = 'TipoCarro' | 'MatriculaCarro' | 'GuiaCarro' | 'ToneladasNetasCarro';

export class Carro extends AbstractElement<CarroAttributes> {
  public getElementName(): string {
    return 'cartaporte31:Carro';
  }

  public addContenedor(attributes: AttributesRecord<ContenedorFerroviarioAttributes> = {}, children: XmlNodeInterface[] = []): ContenedorFerroviario {
    const subject = new ContenedorFerroviario(attributes, children);
    this.addChild(subject);

    return subject;
  }

  public multiContenedor(...elementAttributes: AttributesRecord<ContenedorFerroviarioAttributes>[]): this {
    for (const attributes of elementAttributes) {
      this.addContenedor(attributes);
    }

    return this;
  }
}
