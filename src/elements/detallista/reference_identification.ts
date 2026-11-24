import { AbstractElement } from '../../common/abstract_element';

export type ReferenceIdentificationAttributes = 'type';

export class ReferenceIdentification extends AbstractElement<ReferenceIdentificationAttributes> {
  public getElementName(): string {
    return 'detallista:referenceIdentification';
  }
}
