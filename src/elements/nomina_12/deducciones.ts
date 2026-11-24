import type { AttributesRecord, XmlNodeInterface } from '@nodecfdi/cfdi-core/types';
import type { DeduccionAttributes } from './deduccion';
import { AbstractElement } from '../../common/abstract_element';
import { Deduccion } from './deduccion';

export type DeduccionesAttributes = 'TotalOtrasDeducciones' | 'TotalImpuestosRetenidos';

export class Deducciones extends AbstractElement<DeduccionesAttributes> {
  public getElementName(): string {
    return 'nomina12:Deducciones';
  }

  public addDeduccion(attributes: AttributesRecord<DeduccionAttributes> = {}, children: XmlNodeInterface[] = []): Deduccion {
    const subject = new Deduccion(attributes, children);
    this.addChild(subject);

    return subject;
  }

  public multiDeduccion(...elementAttributes: AttributesRecord<DeduccionAttributes>[]): this {
    for (const attributes of elementAttributes) {
      this.addDeduccion(attributes);
    }

    return this;
  }
}
