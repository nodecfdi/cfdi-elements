import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import { AbstractElement } from '../../common/abstract_element';
import { PersonOrDepartmentName } from './person_or_department_name';

export class ContactInformation extends AbstractElement {
  public getElementName(): string {
    return 'detallista:contactInformation';
  }

  public getPersonOrDepartmentName(): PersonOrDepartmentName {
    return this.helperGetOrAdd(new PersonOrDepartmentName());
  }

  public addPersonOrDepartmentName(attributes: AttributesRecord = {}): PersonOrDepartmentName {
    const subject = this.getPersonOrDepartmentName();
    subject.addAttributes(attributes);

    return subject;
  }
}
