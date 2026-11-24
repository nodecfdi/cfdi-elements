import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import type { DeduccionAttributes } from './deduccion';
import AbstractElement from '../../common/abstract_element';
import { Deduccion } from './deduccion';

export type DeduccionesAttributes = 'TotalOtrasDeducciones' | 'TotalImpuestosRetenidos';

export class Deducciones extends AbstractElement<DeduccionesAttributes> {
  public getElementName(): string {
    return 'nomina12:Deducciones';
  }

  public addDeduccion(attributes: AttributesRecord<DeduccionAttributes> = {}): Deduccion {
    const subject = new Deduccion(attributes);
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
