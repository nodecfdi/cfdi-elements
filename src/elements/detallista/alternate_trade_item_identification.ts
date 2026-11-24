import { AbstractElement } from '../../common/abstract_element';

export type AlternateTradeItemIdentificationAttributes = 'type';

export class AlternateTradeItemIdentification extends AbstractElement<AlternateTradeItemIdentificationAttributes> {
  public getElementName(): string {
    return 'detallista:alternateTradeItemIdentification';
  }
}
