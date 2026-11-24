import { describe, expect, test } from 'vitest';
import { ImpuestosLocales, RetencionesLocales, TrasladosLocales } from '../../../../src/elements/implocal_10/index';

describe('implocal10', () => {
  test('impuestos locales', ({ assert }) => {
    const element = new ImpuestosLocales();
    expect(element).toElementHasName('implocal:ImpuestosLocales');
    expect(element).toElementHasOrder(['implocal:RetencionesLocales', 'implocal:TrasladosLocales']);
    expect(element).toElementHasFixedAttributes({
      'xmlns:implocal': 'http://www.sat.gob.mx/implocal',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xsi:schemaLocation':
        'http://www.sat.gob.mx/implocal http://www.sat.gob.mx/sitio_internet/cfd/implocal/implocal.xsd',
      'version': '1.0',
    });
    assert.toElementHasChildMultiple(element, RetencionesLocales);
    assert.toElementHasChildMultiple(element, TrasladosLocales);
  });

  test('retenciones locales', () => {
    const element = new RetencionesLocales();
    expect(element).toElementHasName('implocal:RetencionesLocales');
  });

  test('traslados locales', () => {
    const element = new TrasladosLocales();
    expect(element).toElementHasName('implocal:TrasladosLocales');
  });
});
