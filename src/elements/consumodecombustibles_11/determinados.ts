import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import type { DeterminadoAttributes } from './determinado';
import { AbstractElement } from '../../common/abstract_element';
import { Determinado } from './determinado';

export class Determinados extends AbstractElement {
  public getElementName(): string {
    return 'consumodecombustibles11:Determinados';
  }

  public addDeterminado(attributes: AttributesRecord<DeterminadoAttributes> = {}): Determinado {
    const subject = new Determinado(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiDeterminado(...elementAttributes: AttributesRecord<DeterminadoAttributes>[]): this {
    for (const attributes of elementAttributes) {
      this.addDeterminado(attributes);
    }

    return this;
  }
}
