import { describe, expect, test } from 'vitest';
import {
  AportacionesODepositos,
  PlanesDeRetiro,
} from '../../../../src/elements/planesderetiro_11/index';

describe('planesderetiro11', () => {
  test('planes de retiro', ({ assert }) => {
    const element = new PlanesDeRetiro();
    expect(element).toElementHasName('planesderetiro11:Planesderetiro');
    expect(element).toElementHasFixedAttributes({
      'xmlns:planesderetiro11': 'http://www.sat.gob.mx/esquemas/retencionpago/1/planesderetiro11',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xsi:schemaLocation':
        'http://www.sat.gob.mx/esquemas/retencionpago/1/planesderetiro11 http://www.sat.gob.mx/esquemas/retencionpago/1/planesderetiro11/planesderetiro11.xsd',
      'Version': '1.1',
    });
    assert.toElementHasChildMultiple(element, AportacionesODepositos);
  });

  test('aportaciones o depositos', () => {
    const element = new AportacionesODepositos();
    expect(element).toElementHasName('planesderetiro11:AportacionesODepositos');
  });
});
