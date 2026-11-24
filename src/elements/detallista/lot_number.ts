import { AbstractElement } from '../../common/abstract_element';

export type LotNumberAttributes = 'productionDate';

export class LotNumber extends AbstractElement<LotNumberAttributes> {
  public getElementName(): string {
    return 'detallista:lotNumber';
  }
}
