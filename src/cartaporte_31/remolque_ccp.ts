import { Mixin } from 'ts-mixer';
import AbstractElement from '#src/common/abstract_element';

export default class RemolqueCCP extends Mixin(AbstractElement) {
  public getElementName(): string {
    return 'cartaporte31:RemolqueCCP';
  }
}
