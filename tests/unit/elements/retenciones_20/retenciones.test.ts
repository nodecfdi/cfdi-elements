import { describe, expect, test } from 'vitest';
import { Addenda, CfdiRetenRelacionados, Complemento, Emisor, Extranjero, ImpRetenidos, Nacional, Periodo, Receptor, Retenciones, Totales } from '../../../../src/elements/retenciones_20/index';

describe('retenciones20', () => {
  test('retenciones', ({ assert }) => {
    const element = new Retenciones();
    expect(element).toElementHasName('retenciones:Retenciones');
    expect(element).toElementHasOrder([
      'retenciones:CfdiRetenRelacionados',
      'retenciones:Emisor',
      'retenciones:Receptor',
      'retenciones:Periodo',
      'retenciones:Totales',
      'retenciones:Complemento',
      'retenciones:Addenda',
    ]);
    expect(element).toElementHasFixedAttributes({
      'xmlns:retenciones': 'http://www.sat.gob.mx/esquemas/retencionpago/2',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xsi:schemaLocation': 'http://www.sat.gob.mx/esquemas/retencionpago/2 http://www.sat.gob.mx/esquemas/retencionpago/2/retencionpagov2.xsd',
      'Version': '2.0',
    });
    assert.toElementHasChildSingle(element, CfdiRetenRelacionados);
    assert.toElementHasChildSingle(element, Emisor);
    assert.toElementHasChildSingle(element, Receptor);
    assert.toElementHasChildSingle(element, Periodo);
    assert.toElementHasChildSingle(element, Totales);
    assert.toElementHasChildSingleAddChild(element, Complemento);
    assert.toElementHasChildSingleAddChild(element, Addenda);
  });

  test('retenciones shortcuts', () => {
    const element = new Retenciones();
    expect(element).toHaveProperty('addImpRetenidos');
    expect(element).toHaveProperty('multiImpRetenidos');
  });

  test('cfdi reten relacionados', () => {
    const element = new CfdiRetenRelacionados();
    expect(element).toElementHasName('retenciones:CfdiRetenRelacionados');
  });

  test('emisor', () => {
    const element = new Emisor();
    expect(element).toElementHasName('retenciones:Emisor');
  });

  test('receptor', ({ assert }) => {
    const element = new Receptor();
    expect(element).toElementHasName('retenciones:Receptor');
    expect(element).toElementHasOrder([
      'retenciones:Nacional',
      'retenciones:Extranjero',
    ]);
    assert.toElementHasChildSingle(element, Nacional);
    assert.toElementHasChildSingle(element, Extranjero);
  });

  test('nacional', () => {
    const element = new Nacional();
    expect(element).toElementHasName('retenciones:Nacional');
  });

  test('extranjero', () => {
    const element = new Extranjero();
    expect(element).toElementHasName('retenciones:Extranjero');
  });

  test('periodo', () => {
    const element = new Periodo();
    expect(element).toElementHasName('retenciones:Periodo');
  });

  test('totales', ({ assert }) => {
    const element = new Totales();
    expect(element).toElementHasName('retenciones:Totales');
    assert.toElementHasChildMultiple(element, ImpRetenidos);
  });

  test('imp retenidos', () => {
    const element = new ImpRetenidos();
    expect(element).toElementHasName('retenciones:ImpRetenidos');
  });

  test('complemento', () => {
    const element = new Complemento();
    expect(element).toElementHasName('retenciones:Complemento');
  });

  test('addenda', () => {
    const element = new Addenda();
    expect(element).toElementHasName('retenciones:Addenda');
  });
});
