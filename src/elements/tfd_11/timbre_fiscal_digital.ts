import AbstractElement from '../../common/abstract_element';

export type TimbreFiscalDigitalAttributes
  = | 'Version'
    | 'UUID'
    | 'FechaTimbrado'
    | 'RfcProvCertif'
    | 'Leyenda'
    | 'SelloCFD'
    | 'NoCertificadoSAT'
    | 'SelloSAT';

export class TimbreFiscalDigital extends AbstractElement<TimbreFiscalDigitalAttributes> {
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
