import { Mixin } from 'ts-mixer';
import AbstractElement from '#src/common/abstract_element';

export default class TimbreFiscalDigital extends Mixin(AbstractElement) {
  public getElementName(): string {
    return 'tfd:TimbreFiscalDigital';
  }

  public getFixedAttributes(): Record<string, string> {
    return {
      'xmlns:tfd': 'http://www.sat.gob.mx/TimbreFiscalDigital',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xsi:schemaLocation':
        'http://www.sat.gob.mx/TimbreFiscalDigital http://www.sat.gob.mx/sitio_internet/cfd/TimbreFiscalDigital/TimbreFiscalDigitalv11.xsd',
      'Version': '1.1',
    };
  }
}
