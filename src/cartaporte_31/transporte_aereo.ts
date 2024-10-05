import { Mixin } from 'ts-mixer';
import AbstractElement from '#src/common/abstract_element';

export default class TransporteAereo extends Mixin(AbstractElement) {
  public getElementName(): string {
    return 'cartaporte31:TransporteAereo';
  }
}
