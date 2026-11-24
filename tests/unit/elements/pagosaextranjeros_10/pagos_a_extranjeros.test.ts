import { describe, expect, test } from 'vitest';
import {
  Beneficiario,
  NoBeneficiario,
  PagosAExtranjeros,
} from '../../../../src/elements/pagosaextranjeros_10/index';

describe('pagosaextranjeros10', () => {
  test('pagos a extranjeros', ({ assert }) => {
    const element = new PagosAExtranjeros();
    expect(element).toElementHasName('pagosaextranjeros:Pagosaextranjeros');
    expect(element).toElementHasOrder([
      'pagosaextranjeros:NoBeneficiario',
      'pagosaextranjeros:Beneficiario',
    ]);
    expect(element).toElementHasFixedAttributes({
      'xmlns:pagosaextranjeros': 'http://www.sat.gob.mx/esquemas/retencionpago/1/pagosaextranjeros',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xsi:schemaLocation':
        'http://www.sat.gob.mx/esquemas/retencionpago/1/pagosaextranjeros http://www.sat.gob.mx/esquemas/retencionpago/1/pagosaextranjeros/pagosaextranjeros.xsd',
      'Version': '1.0',
    });
    assert.toElementHasChildSingle(element, NoBeneficiario);
    assert.toElementHasChildSingle(element, Beneficiario);
  });

  test('no beneficiario', () => {
    const element = new NoBeneficiario();
    expect(element).toElementHasName('pagosaextranjeros:NoBeneficiario');
  });

  test('beneficiario', () => {
    const element = new Beneficiario();
    expect(element).toElementHasName('pagosaextranjeros:Beneficiario');
  });
});
