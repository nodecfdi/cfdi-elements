import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import type { ContabilidadAttributes } from './contabilidad';
import { AbstractElement } from '../../common/abstract_element';
import { Contabilidad } from './contabilidad';

export type EntidadAttributes = 'ClaveEntidad' | 'Ambito';

export class Entidad extends AbstractElement<EntidadAttributes> {
  public getElementName(): string {
    return 'ine:Entidad';
  }

  public addContabilidad(attributes: AttributesRecord<ContabilidadAttributes> = {}): Contabilidad {
    const subject = new Contabilidad(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiContabilidad(...elementAttributes: AttributesRecord<ContabilidadAttributes>[]): this {
    for (const attributes of elementAttributes) {
      this.addContabilidad(attributes);
    }

    return this;
  }
}
