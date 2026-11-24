import { describe, expect, test } from 'vitest';
import { Intereses } from '../../../../src/elements/intereses_10/index';

describe('intereses10', () => {
  test('intereses', () => {
    const element = new Intereses();
    expect(element).toElementHasName('intereses:Intereses');
    expect(element).toElementHasFixedAttributes({
      'xmlns:intereses': 'http://www.sat.gob.mx/esquemas/retencionpago/1/intereses',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xsi:schemaLocation':
        'http://www.sat.gob.mx/esquemas/retencionpago/1/intereses http://www.sat.gob.mx/esquemas/retencionpago/1/intereses/intereses.xsd',
      'Version': '1.0',
    });
  });
});
