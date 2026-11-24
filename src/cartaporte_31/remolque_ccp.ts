import AbstractElement from '../common/abstract_element';

export type RemolqueCCPAttributes = 'SubTipoRemCCP' | 'PlacaCCP';

export class RemolqueCCP extends AbstractElement<RemolqueCCPAttributes> {
  public getElementName(): string {
    return 'cartaporte31:RemolqueCCP';
  }
}
