import { describe, expect, test } from 'vitest';
import { InteresesHipotecarios } from '../../../../src/elements/intereseshipotecarios_10/index';

describe('intereseshipotecarios10', () => {
  test('intereses hipotecarios', () => {
    const element = new InteresesHipotecarios();
    expect(element).toElementHasName('intereseshipotecarios:Intereseshipotecarios');
    expect(element).toElementHasFixedAttributes({
      'xmlns:intereseshipotecarios': 'http://www.sat.gob.mx/esquemas/retencionpago/1/intereseshipotecarios',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xsi:schemaLocation':
        'http://www.sat.gob.mx/esquemas/retencionpago/1/intereseshipotecarios http://www.sat.gob.mx/esquemas/retencionpago/1/intereseshipotecarios/intereseshipotecarios.xsd',
      'Version': '1.0',
    });
  });
});
