import { describe, expect, test } from 'vitest';
import { Contabilidad, Entidad, INE } from '../../../../src/elements/ine_11/index';

describe('ine11', () => {
  test('ine', ({ assert }) => {
    const element = new INE();
    expect(element).toElementHasName('ine:INE');
    expect(element).toElementHasFixedAttributes({
      'xmlns:ine': 'http://www.sat.gob.mx/ine',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xsi:schemaLocation':
        'http://www.sat.gob.mx/ine http://www.sat.gob.mx/sitio_internet/cfd/ine/ine11.xsd',
      'Version': '1.1',
    });
    assert.toElementHasChildMultiple(element, Entidad);
  });

  test('entidad', ({ assert }) => {
    const element = new Entidad();
    expect(element).toElementHasName('ine:Entidad');
    assert.toElementHasChildMultiple(element, Contabilidad);
  });

  test('contabilidad', () => {
    const element = new Contabilidad();
    expect(element).toElementHasName('ine:Contabilidad');
  });
});
