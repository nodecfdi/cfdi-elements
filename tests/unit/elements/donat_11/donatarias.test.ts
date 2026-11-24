import { describe, expect, test } from 'vitest';
import { Donatarias } from '../../../../src/elements/donat_11/index';

describe('donat11', () => {
  test('donatarias', () => {
    const element = new Donatarias();
    expect(element).toElementHasName('donat:Donatarias');
    expect(element).toElementHasFixedAttributes({
      'xmlns:donat': 'http://www.sat.gob.mx/donat',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xsi:schemaLocation':
        'http://www.sat.gob.mx/donat http://www.sat.gob.mx/sitio_internet/cfd/donat/donat11.xsd',
      'version': '1.1',
    });
  });
});
