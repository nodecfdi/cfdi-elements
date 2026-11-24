import { AbstractElement } from '../../common/abstract_element';

export type RemanenteAttributes = 'ProporcionRem';

export class Remanente extends AbstractElement<RemanenteAttributes> {
  public getElementName(): string {
    return 'dividendos:Remanente';
  }
}
