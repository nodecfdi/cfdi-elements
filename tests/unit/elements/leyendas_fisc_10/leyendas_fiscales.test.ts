import { describe, expect, test } from 'vitest';
import { Leyenda, LeyendasFiscales } from '../../../../src/elements/leyendas_fisc_10/index';

describe('leyendasFisc10', () => {
  test('leyendas fiscales', ({ assert }) => {
    const element = new LeyendasFiscales();
    expect(element).toElementHasName('leyendasFisc:LeyendasFiscales');
    expect(element).toElementHasFixedAttributes({
      'xmlns:leyendasFisc': 'http://www.sat.gob.mx/leyendasFiscales',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xsi:schemaLocation':
        'http://www.sat.gob.mx/leyendasFiscales http://www.sat.gob.mx/sitio_internet/cfd/leyendasFiscales/leyendasFisc.xsd',
      'version': '1.0',
    });
    assert.toElementHasChildMultiple(element, Leyenda);
  });

  test('leyenda', () => {
    const element = new Leyenda();
    expect(element).toElementHasName('leyendasFisc:Leyenda');
  });
});
