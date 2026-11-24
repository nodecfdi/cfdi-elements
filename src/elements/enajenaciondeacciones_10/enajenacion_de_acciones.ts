import { AbstractElement } from '../../common/abstract_element';

export type EnajenacionDeAccionesAttributes = 'Version' | 'ContratoIntermediacion' | 'Ganancia' | 'Perdida';

export class EnajenacionDeAcciones extends AbstractElement<EnajenacionDeAccionesAttributes> {
  public getElementName(): string {
    return 'enajenaciondeacciones:EnajenaciondeAcciones';
  }

  public getFixedAttributes(): Record<string, string> {
    return {
      'xmlns:enajenaciondeacciones': 'http://www.sat.gob.mx/esquemas/retencionpago/1/enajenaciondeacciones',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xsi:schemaLocation':
          'http://www.sat.gob.mx/esquemas/retencionpago/1/enajenaciondeacciones http://www.sat.gob.mx/esquemas/retencionpago/1/enajenaciondeacciones/enajenaciondeacciones.xsd',
      'Version': '1.0',
    };
  }
}
