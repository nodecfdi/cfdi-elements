import { Mixin } from 'ts-mixer';
import AbstractElement from '#src/common/abstract_element';

export default class Traslado extends Mixin(AbstractElement) {
  public getElementName(): string {
    return 'cfdi:Traslado';
  }
}
