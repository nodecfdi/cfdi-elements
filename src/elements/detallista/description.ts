import { AbstractElement } from '../../common/abstract_element';

export type DescriptionAttributes = 'type';

export class Description extends AbstractElement<DescriptionAttributes> {
  public getElementName(): string {
    return 'detallista:description';
  }
}
