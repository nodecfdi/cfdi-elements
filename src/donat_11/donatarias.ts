import { Mixin } from 'ts-mixer';
import AbstractElement from '#src/common/abstract_element';

export default class Donatarias extends Mixin(AbstractElement) {
  public getElementName(): string {
    return 'donat:Donatarias';
  }

  public getFixedAttributes(): Record<string, string> {
    return {
      'xmlns:donat': 'http://www.sat.gob.mx/donat',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xsi:schemaLocation':
        'http://www.sat.gob.mx/donat http://www.sat.gob.mx/sitio_internet/cfd/donat/donat11.xsd',
      'version': '1.1',
    };
  }
}
