import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import { AbstractElement } from '../../common/abstract_element';
import { Text } from './text';

export class PersonOrDepartmentName extends AbstractElement {
  public getElementName(): string {
    return 'detallista:personOrDepartmentName';
  }

  public getText(): Text {
    return this.helperGetOrAdd(new Text());
  }

  public addText(attributes: AttributesRecord = {}): Text {
    const subject = this.getText();
    subject.addAttributes(attributes);

    return subject;
  }
}
