import { describe, expect, test } from 'vitest';
import { Dividendos, DividOUtil, Remanente } from '../../../../src/elements/dividendos_10/index';

describe('dividendos10', () => {
  test('dividendos', ({ assert }) => {
    const element = new Dividendos();
    expect(element).toElementHasName('dividendos:Dividendos');
    expect(element).toElementHasOrder(['dividendos:DividOUtil', 'dividendos:Remanente']);
    expect(element).toElementHasFixedAttributes({
      'xmlns:dividendos': 'http://www.sat.gob.mx/esquemas/retencionpago/1/dividendos',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xsi:schemaLocation':
        'http://www.sat.gob.mx/esquemas/retencionpago/1/dividendos http://www.sat.gob.mx/esquemas/retencionpago/1/dividendos/dividendos.xsd',
      'Version': '1.0',
    });
    assert.toElementHasChildSingle(element, DividOUtil);
    assert.toElementHasChildSingle(element, Remanente);
  });

  test('divid o util', () => {
    const element = new DividOUtil();
    expect(element).toElementHasName('dividendos:DividOUtil');
  });

  test('remanente', () => {
    const element = new Remanente();
    expect(element).toElementHasName('dividendos:Remanente');
  });
});
