import { Mixin } from 'ts-mixer';
import AbstractElement from '#src/common/abstract_element';

export default class Domicilio extends Mixin(AbstractElement) {
  public getElementName(): string {
    return 'cartaporte31:Domicilio';
  }
}
