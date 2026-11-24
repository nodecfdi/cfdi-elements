import AbstractElement from '../../common/abstract_element';

export type ContabilidadAttributes = 'IdContabilidad';

export class Contabilidad extends AbstractElement<ContabilidadAttributes> {
  public getElementName(): string {
    return 'ine:Contabilidad';
  }
}
