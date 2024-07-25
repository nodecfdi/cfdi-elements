import { Mixin } from 'ts-mixer';
import AbstractElement from '#src/common/abstract_element';

export default class RetencionDR extends Mixin(AbstractElement) {
  public getElementName(): string {
    return 'pago20:RetencionDR';
  }
}
