import { describe, expect, test } from 'vitest';
import { InstEducativas } from '../../../../src/elements/iedu_10/index';

describe('iedu10', () => {
  test('inst educativas', () => {
    const element = new InstEducativas();
    expect(element).toElementHasName('iedu:instEducativas');
    expect(element).toElementHasFixedAttributes({
      'xmlns:iedu': 'http://www.sat.gob.mx/iedu',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xsi:schemaLocation': 'http://www.sat.gob.mx/iedu http://www.sat.gob.mx/sitio_internet/cfd/iedu/iedu.xsd',
      'version': '1.0',
    });
  });
});
