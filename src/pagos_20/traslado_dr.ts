import { Mixin } from 'ts-mixer';
import AbstractElement from '#src/common/abstract_element';

export default class TrasladoDR extends Mixin(AbstractElement) {
  public getElementName(): string {
    return 'pago20:TrasladoDR';
  }
}
