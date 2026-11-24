import AbstractElement from '../common/abstract_element';

export type RemolqueAttributes = 'SubTipoRem' | 'Placa';

export class Remolque extends AbstractElement<RemolqueAttributes> {
  public getElementName(): string {
    return 'cartaporte31:Remolque';
  }
}
