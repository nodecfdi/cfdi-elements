import { describe, expect, test } from 'vitest';
import {
  ConceptoConsumoDeCombustibles,
  Conceptos,
  ConsumoDeCombustibles,
  Determinado,
  Determinados,
} from '../../../../src/elements/consumodecombustibles_11/index';

describe('consumodecombustibles11', () => {
  test('consumo de combustibles', ({ assert }) => {
    const element = new ConsumoDeCombustibles();
    expect(element).toElementHasName('consumodecombustibles11:ConsumoDeCombustibles');
    expect(element).toElementHasFixedAttributes({
      'xmlns:consumodecombustibles11': 'http://www.sat.gob.mx/ConsumoDeCombustibles11',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xsi:schemaLocation':
        'http://www.sat.gob.mx/ConsumoDeCombustibles11 http://www.sat.gob.mx/sitio_internet/cfd/consumodecombustibles/consumodeCombustibles11.xsd',
      'version': '1.1',
    });
    assert.toElementHasChildSingle(element, Conceptos);
  });

  test('conceptos', ({ assert }) => {
    const element = new Conceptos();
    expect(element).toElementHasName('consumodecombustibles11:Conceptos');
    assert.toElementHasChildMultiple(element, ConceptoConsumoDeCombustibles);
  });

  test('concepto consumo de combustibles', ({ assert }) => {
    const element = new ConceptoConsumoDeCombustibles();
    expect(element).toElementHasName('consumodecombustibles11:ConceptoConsumoDeCombustibles');
    assert.toElementHasChildSingle(element, Determinados);
  });

  test('determinados', ({ assert }) => {
    const element = new Determinados();
    expect(element).toElementHasName('consumodecombustibles11:Determinados');
    assert.toElementHasChildMultiple(element, Determinado);
  });

  test('determinado', () => {
    const element = new Determinado();
    expect(element).toElementHasName('consumodecombustibles11:Determinado');
  });
});
