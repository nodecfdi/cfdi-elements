import { describe, expect, test } from 'vitest';
import TimbreFiscalDigital from '../../../src/tfd_11/timbre_fiscal_digital';

describe('tfd11', () => {
  test('timbre fiscal digital', () => {
    const element = new TimbreFiscalDigital();
    expect(element).toElementHasName('tfd:TimbreFiscalDigital');
    expect(element).toElementHasFixedAttributes({
      'Version': '1.1',
      'xmlns:tfd': 'https://www.sat.gob.mx/TimbreFiscalDigital',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xsi:schemaLocation':
        'https://www.sat.gob.mx/TimbreFiscalDigital https://www.sat.gob.mx/sitio_internet/cfd/TimbreFiscalDigital/TimbreFiscalDigitalv11.xsd',
    });
  });
});
