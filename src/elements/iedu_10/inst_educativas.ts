import AbstractElement from '../../common/abstract_element';

export type InstEducativasAttributes
  = | 'version'
    | 'nombreAlumno'
    | 'CURP'
    | 'nivelEducativo'
    | 'autRVOE'
    | 'rfcPago';

export class InstEducativas extends AbstractElement<InstEducativasAttributes> {
  public getElementName(): string {
    return 'iedu:instEducativas';
  }

  public getFixedAttributes(): Record<string, string> {
    return {
      'xmlns:iedu': 'http://www.sat.gob.mx/iedu',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xsi:schemaLocation':
          'http://www.sat.gob.mx/iedu http://www.sat.gob.mx/sitio_internet/cfd/iedu/iedu.xsd',
      'version': '1.0',
    };
  }
}
