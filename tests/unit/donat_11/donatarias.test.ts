import { describe, expect, test } from 'vitest';
import { Donatarias } from '../../../src/donat_11/donatarias';

describe('donat11', () => {
  test('donatarias', () => {
    const element = new Donatarias();
    expect(element).toElementHasName('donat:Donatarias');
    expect(element).toElementHasFixedAttributes({
      'xmlns:donat': 'https://www.sat.gob.mx/donat',
      'xsi:schemaLocation':
        'https://www.sat.gob.mx/donat https://www.sat.gob.mx/sitio_internet/cfd/donat/donat11.xsd',
      'version': '1.1',
    });
  });
});
