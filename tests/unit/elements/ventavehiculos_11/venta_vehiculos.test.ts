import { describe, expect, test } from 'vitest';
import {
  InformacionAduanera,
  Parte,
  VentaVehiculos,
} from '../../../../src/elements/ventavehiculos_11/index';

describe('ventavehiculos11', () => {
  test('venta vehiculos', ({ assert }) => {
    const element = new VentaVehiculos();
    expect(element).toElementHasName('ventavehiculos:VentaVehiculos');
    expect(element).toElementHasOrder([
      'ventavehiculos:InformacionAduanera',
      'ventavehiculos:Parte',
    ]);
    expect(element).toElementHasFixedAttributes({
      'xmlns:ventavehiculos': 'http://www.sat.gob.mx/ventavehiculos',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xsi:schemaLocation':
        'http://www.sat.gob.mx/ventavehiculos http://www.sat.gob.mx/sitio_internet/cfd/ventavehiculos/ventavehiculos11.xsd',
      'version': '1.1',
    });
    assert.toElementHasChildMultiple(element, InformacionAduanera);
    assert.toElementHasChildMultiple(element, Parte);
  });

  test('informacion aduanera', () => {
    const element = new InformacionAduanera();
    expect(element).toElementHasName('ventavehiculos:InformacionAduanera');
  });

  test('parte', ({ assert }) => {
    const element = new Parte();
    expect(element).toElementHasName('ventavehiculos:Parte');
    assert.toElementHasChildMultiple(element, InformacionAduanera);
  });
});
