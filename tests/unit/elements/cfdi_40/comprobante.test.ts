import { describe, expect, test } from 'vitest';
import {
  ACuentaTerceros,
  Addenda,
  CfdiRelacionado,
  CfdiRelacionados,
  Complemento,
  ComplementoConcepto,
  Comprobante,
  Concepto,
  ConceptoImpuestos,
  Conceptos,
  CuentaPredial,
  Emisor,
  Impuestos,
  InformacionAduanera,
  InformacionGlobal,
  Parte,
  Receptor,
  Retencion,
  Retenciones,
  Traslado,
  Traslados,
} from '../../../../src/elements/cfdi_40/index';

describe('cfdi40', () => {
  test('comprobante', ({ assert }) => {
    const element = new Comprobante();
    expect(element).toElementHasName('cfdi:Comprobante');
    expect(element).toElementHasOrder([
      'cfdi:InformacionGlobal',
      'cfdi:CfdiRelacionados',
      'cfdi:Emisor',
      'cfdi:Receptor',
      'cfdi:Conceptos',
      'cfdi:Impuestos',
      'cfdi:Complemento',
      'cfdi:Addenda',
    ]);
    expect(element).toElementHasFixedAttributes({
      'xmlns:cfdi': 'http://www.sat.gob.mx/cfd/4',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xsi:schemaLocation':
        'http://www.sat.gob.mx/cfd/4 http://www.sat.gob.mx/sitio_internet/cfd/4/cfdv40.xsd',
      'Version': '4.0',
    });
    assert.toElementHasChildSingle(element, InformacionGlobal);
    assert.toElementHasChildMultiple(element, CfdiRelacionados);
    assert.toElementHasChildSingle(element, Emisor);
    assert.toElementHasChildSingle(element, Receptor);
    assert.toElementHasChildSingle(element, Conceptos);
    assert.toElementHasChildSingle(element, Impuestos);
    assert.toElementHasChildSingleAddChild(element, Complemento);
    assert.toElementHasChildSingleAddChild(element, Addenda);
  });

  test('comprobante impuestos shortcuts', () => {
    const element = new Comprobante();
    expect(element).toHaveProperty('addTraslado');
    expect(element).toHaveProperty('multiTraslado');
    expect(element).toHaveProperty('addRetencion');
    expect(element).toHaveProperty('multiRetencion');
  });

  test('informacion global', () => {
    const element = new InformacionGlobal();
    expect(element).toElementHasName('cfdi:InformacionGlobal');
  });

  test('cfdi relacionados', ({ assert }) => {
    const element = new CfdiRelacionados();
    expect(element).toElementHasName('cfdi:CfdiRelacionados');
    assert.toElementHasChildMultiple(element, CfdiRelacionado);
  });

  test('cfdi relacionado', () => {
    const element = new CfdiRelacionado();
    expect(element).toElementHasName('cfdi:CfdiRelacionado');
  });

  test('emisor', () => {
    const element = new Emisor();
    expect(element).toElementHasName('cfdi:Emisor');
  });

  test('receptor', () => {
    const element = new Receptor();
    expect(element).toElementHasName('cfdi:Receptor');
  });

  test('conceptos', ({ assert }) => {
    const element = new Conceptos();
    expect(element).toElementHasName('cfdi:Conceptos');
    assert.toElementHasChildMultiple(element, Concepto);
  });

  test('concepto', ({ assert }) => {
    const element = new Concepto();
    expect(element).toElementHasName('cfdi:Concepto');
    expect(element).toElementHasOrder([
      'cfdi:Impuestos',
      'cfdi:ACuentaTerceros',
      'cfdi:InformacionAduanera',
      'cfdi:CuentaPredial',
      'cfdi:ComplementoConcepto',
      'cfdi:Parte',
    ]);
    assert.toElementHasChildSingle(element, ConceptoImpuestos, 'getImpuestos', 'addImpuestos');
    assert.toElementHasChildSingle(element, ACuentaTerceros);
    assert.toElementHasChildMultiple(element, InformacionAduanera);
    assert.toElementHasChildMultiple(element, CuentaPredial);
    assert.toElementHasChildSingleAddChild(element, ComplementoConcepto);
    assert.toElementHasChildMultiple(element, Parte);
  });

  test('concepto impuestos shortcuts', () => {
    const element = new Concepto();
    expect(element).toHaveProperty('addTraslado');
    expect(element).toHaveProperty('multiTraslado');
    expect(element).toHaveProperty('addRetencion');
    expect(element).toHaveProperty('multiRetencion');
  });

  test('concepto impuestos', ({ assert }) => {
    const element = new ConceptoImpuestos();
    expect(element).toElementHasName('cfdi:Impuestos');
    expect(element).toElementHasOrder(['cfdi:Traslados', 'cfdi:Retenciones']);
    assert.toElementHasChildSingle(element, Traslados);
    assert.toElementHasChildSingle(element, Retenciones);
  });

  test('traslados', ({ assert }) => {
    const element = new Traslados();
    expect(element).toElementHasName('cfdi:Traslados');
    assert.toElementHasChildMultiple(element, Traslado);
  });

  test('traslado', () => {
    const element = new Traslado();
    expect(element).toElementHasName('cfdi:Traslado');
  });

  test('retenciones', ({ assert }) => {
    const element = new Retenciones();
    expect(element).toElementHasName('cfdi:Retenciones');
    assert.toElementHasChildMultiple(element, Retencion);
  });

  test('retencion', () => {
    const element = new Retencion();
    expect(element).toElementHasName('cfdi:Retencion');
  });

  test('a cuenta terceros', () => {
    const element = new ACuentaTerceros();
    expect(element).toElementHasName('cfdi:ACuentaTerceros');
  });

  test('informacion aduanera', () => {
    const element = new InformacionAduanera();
    expect(element).toElementHasName('cfdi:InformacionAduanera');
  });

  test('cuenta predial', () => {
    const element = new CuentaPredial();
    expect(element).toElementHasName('cfdi:CuentaPredial');
  });

  test('complemento concepto', () => {
    const element = new ComplementoConcepto();
    expect(element).toElementHasName('cfdi:ComplementoConcepto');
  });

  test('parte', ({ assert }) => {
    const element = new Parte();
    expect(element).toElementHasName('cfdi:Parte');
    assert.toElementHasChildMultiple(element, InformacionAduanera);
  });

  test('impuestos', ({ assert }) => {
    const element = new Impuestos();
    expect(element).toElementHasName('cfdi:Impuestos');
    expect(element).toElementHasOrder(['cfdi:Retenciones', 'cfdi:Traslados']);
    assert.toElementHasChildSingle(element, Retenciones);
    assert.toElementHasChildSingle(element, Traslados);
  });

  test('complemento', () => {
    const element = new Complemento();
    expect(element).toElementHasName('cfdi:Complemento');
  });

  test('addenda', () => {
    const element = new Addenda();
    expect(element).toElementHasName('cfdi:Addenda');
  });
});
