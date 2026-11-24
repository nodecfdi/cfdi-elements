import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import { AbstractElement } from '../../common/abstract_element';
import { Gln } from './gln';

export class Customs extends AbstractElement {
  public getElementName(): string {
    return 'detallista:Customs';
  }

  public getGln(): Gln {
    return this.helperGetOrAdd(new Gln());
  }

  public addGln(attributes: AttributesRecord = {}): Gln {
    const subject = this.getGln();
    subject.addAttributes(attributes);

    return subject;
  }
}
