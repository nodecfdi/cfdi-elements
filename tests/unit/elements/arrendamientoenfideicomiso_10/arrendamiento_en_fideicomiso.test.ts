import { describe, expect, test } from 'vitest';
import {
  ArrendamientoEnFideicomiso,
} from '../../../../src/elements/arrendamientoenfideicomiso_10/index';

describe('arrendamientoenfideicomiso10', () => {
  test('arrendamiento en fideicomiso', () => {
    const element = new ArrendamientoEnFideicomiso();
    expect(element).toElementHasName('arrendamientoenfideicomiso:Arrendamientoenfideicomiso');
    expect(element).toElementHasFixedAttributes({
      'xmlns:arrendamientoenfideicomiso': 'http://www.sat.gob.mx/esquemas/retencionpago/1/arrendamientoenfideicomiso',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xsi:schemaLocation':
        'http://www.sat.gob.mx/esquemas/retencionpago/1/arrendamientoenfideicomiso http://www.sat.gob.mx/esquemas/retencionpago/1/arrendamientoenfideicomiso/arrendamientoenfideicomiso.xsd',
      'Version': '1.0',
    });
  });
});
