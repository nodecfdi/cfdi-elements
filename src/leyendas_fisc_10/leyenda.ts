import { Mixin } from 'ts-mixer';
import AbstractElement from '#src/common/abstract_element';

export default class Leyenda extends Mixin(AbstractElement) {
  public getElementName(): string {
    return 'leyendasFisc:Leyenda';
  }
}
