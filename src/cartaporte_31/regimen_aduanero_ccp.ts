import AbstractElement from '../common/abstract_element';

export type RegimenAduaneroCCPAttributes = 'RegimenAduanero';

export class RegimenAduaneroCCP extends AbstractElement<RegimenAduaneroCCPAttributes> {
  public getElementName(): string {
    return 'cartaporte31:RegimenAduaneroCCP';
  }
}
