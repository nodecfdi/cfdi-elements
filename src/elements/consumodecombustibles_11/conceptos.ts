import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import type { ConceptoConsumoDeCombustiblesAttributes } from './concepto_consumo_de_combustibles';
import AbstractElement from '../../common/abstract_element';
import { ConceptoConsumoDeCombustibles } from './concepto_consumo_de_combustibles';

export class Conceptos extends AbstractElement {
  public getElementName(): string {
    return 'consumodecombustibles11:Conceptos';
  }

  public addConceptoConsumoDeCombustibles(attributes: AttributesRecord<ConceptoConsumoDeCombustiblesAttributes> = {}): ConceptoConsumoDeCombustibles {
    const subject = new ConceptoConsumoDeCombustibles(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiConceptoConsumoDeCombustibles(...elementAttributes: AttributesRecord<ConceptoConsumoDeCombustiblesAttributes>[]): this {
    for (const attributes of elementAttributes) {
      this.addConceptoConsumoDeCombustibles(attributes);
    }

    return this;
  }
}
