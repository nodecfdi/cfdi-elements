import { AbstractElement } from '../../common/abstract_element';

export type AlternatePartyIdentificationAttributes = 'type';

export class AlternatePartyIdentification extends AbstractElement<AlternatePartyIdentificationAttributes> {
  public getElementName(): string {
    return 'detallista:alternatePartyIdentification';
  }
}
