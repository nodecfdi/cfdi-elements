import { describe, expect, test } from 'vitest';
import { EnajenacionDeAcciones } from '../../../../src/elements/enajenaciondeacciones_10/index';

describe('enajenaciondeacciones10', () => {
  test('enajenacion de acciones', () => {
    const element = new EnajenacionDeAcciones();
    expect(element).toElementHasName('enajenaciondeacciones:EnajenaciondeAcciones');
    expect(element).toElementHasFixedAttributes({
      'xmlns:enajenaciondeacciones': 'http://www.sat.gob.mx/esquemas/retencionpago/1/enajenaciondeacciones',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xsi:schemaLocation':
        'http://www.sat.gob.mx/esquemas/retencionpago/1/enajenaciondeacciones http://www.sat.gob.mx/esquemas/retencionpago/1/enajenaciondeacciones/enajenaciondeacciones.xsd',
      'Version': '1.0',
    });
  });
});
