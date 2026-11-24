import AbstractElement from '../../common/abstract_element';

export type TrasladosLocalesAttributes = 'ImpLocTrasladado' | 'TasadeTraslado' | 'Importe';

export class TrasladosLocales extends AbstractElement<TrasladosLocalesAttributes> {
  public getElementName(): string {
    return 'implocal:TrasladosLocales';
  }
}
