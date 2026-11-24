import { describe, expect, test } from 'vitest';
import { Inmueble, ParcialesConstruccion } from '../../../../src/elements/servicioparcial_10/index';

describe('servicioparcial10', () => {
  test('parciales construccion', ({ assert }) => {
    const element = new ParcialesConstruccion();
    expect(element).toElementHasName('servicioparcial:parcialesconstruccion');
    expect(element).toElementHasFixedAttributes({
      'xmlns:servicioparcial': 'http://www.sat.gob.mx/servicioparcialconstruccion',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xsi:schemaLocation': 'http://www.sat.gob.mx/servicioparcialconstruccion http://www.sat.gob.mx/sitio_internet/cfd/servicioparcialconstruccion/servicioparcialconstruccion.xsd',
      'Version': '1.0',
    });
    assert.toElementHasChildSingle(element, Inmueble);
  });

  test('inmueble', () => {
    const element = new Inmueble();
    expect(element).toElementHasName('servicioparcial:Inmueble');
  });
});
