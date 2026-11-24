import AbstractElement from '../common/abstract_element';

export default class TimbreFiscalDigital extends AbstractElement {
  public getElementName(): string {
    return 'tfd:TimbreFiscalDigital';
  }

  public getFixedAttributes(): Record<string, string> {
    return {
      'xmlns:tfd': 'https://www.sat.gob.mx/TimbreFiscalDigital',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xsi:schemaLocation':
        'https://www.sat.gob.mx/TimbreFiscalDigital https://www.sat.gob.mx/sitio_internet/cfd/TimbreFiscalDigital/TimbreFiscalDigitalv11.xsd',
      'Version': '1.1',
    };
  }
}
