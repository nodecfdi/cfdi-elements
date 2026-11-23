import { Mixin } from 'ts-mixer';
import AbstractElement from '../common/abstract_element';

export default class ACuentaTerceros extends Mixin(AbstractElement) {
  public getElementName(): string {
    return 'cfdi:ACuentaTerceros';
  }
}
