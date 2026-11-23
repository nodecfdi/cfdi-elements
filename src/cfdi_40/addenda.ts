import { Mixin } from 'ts-mixer';
import AbstractElement from '../common/abstract_element';

export default class Addenda extends Mixin(AbstractElement) {
  public getElementName(): string {
    return 'cfdi:Addenda';
  }
}
