import { describe, expect, test } from 'vitest';
import {
  AccionesOTitulos,
  CompensacionSaldosAFavor,
  Deduccion,
  Deducciones,
  Emisor,
  EntidadSNCF,
  HorasExtra,
  Incapacidad,
  Incapacidades,
  JubilacionPensionRetiro,
  Nomina,
  OtroPago,
  OtrosPagos,
  Percepcion,
  Percepciones,
  Receptor,
  SeparacionIndemnizacion,
  SubContratacion,
  SubsidioAlEmpleo,
} from '../../../../src/elements/nomina_12/index';

describe('nomina12', () => {
  test('nomina', ({ assert }) => {
    const element = new Nomina();
    expect(element).toElementHasName('nomina12:Nomina');
    expect(element).toElementHasOrder([
      'nomina12:Emisor',
      'nomina12:Receptor',
      'nomina12:Percepciones',
      'nomina12:Deducciones',
      'nomina12:OtrosPagos',
      'nomina12:Incapacidades',
    ]);
    expect(element).toElementHasFixedAttributes({
      'xmlns:nomina12': 'http://www.sat.gob.mx/nomina12',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xsi:schemaLocation':
        'http://www.sat.gob.mx/nomina12 http://www.sat.gob.mx/sitio_internet/cfd/nomina/nomina12.xsd',
      'Version': '1.2',
    });
    assert.toElementHasChildSingle(element, Emisor);
    assert.toElementHasChildSingle(element, Receptor);
    assert.toElementHasChildSingle(element, Percepciones);
    assert.toElementHasChildSingle(element, Deducciones);
    assert.toElementHasChildSingle(element, OtrosPagos);
    assert.toElementHasChildSingle(element, Incapacidades);
  });

  test('emisor', ({ assert }) => {
    const element = new Emisor();
    expect(element).toElementHasName('nomina12:Emisor');
    assert.toElementHasChildSingle(element, EntidadSNCF);
  });

  test('entidad sncf', () => {
    const element = new EntidadSNCF();
    expect(element).toElementHasName('nomina12:EntidadSNCF');
  });

  test('receptor', ({ assert }) => {
    const element = new Receptor();
    expect(element).toElementHasName('nomina12:Receptor');
    assert.toElementHasChildMultiple(element, SubContratacion);
  });

  test('sub contratacion', () => {
    const element = new SubContratacion();
    expect(element).toElementHasName('nomina12:SubContratacion');
  });

  test('percepciones', ({ assert }) => {
    const element = new Percepciones();
    expect(element).toElementHasName('nomina12:Percepciones');
    expect(element).toElementHasOrder([
      'nomina12:Percepcion',
      'nomina12:JubilacionPensionRetiro',
      'nomina12:SeparacionIndemnizacion',
    ]);
    assert.toElementHasChildMultiple(element, Percepcion);
    assert.toElementHasChildSingle(element, JubilacionPensionRetiro);
    assert.toElementHasChildSingle(element, SeparacionIndemnizacion);
  });

  test('percepcion', ({ assert }) => {
    const element = new Percepcion();
    expect(element).toElementHasName('nomina12:Percepcion');
    expect(element).toElementHasOrder(['nomina12:AccionesOTitulos', 'nomina12:HorasExtra']);
    assert.toElementHasChildSingle(element, AccionesOTitulos);
    assert.toElementHasChildMultiple(element, HorasExtra);
  });

  test('acciones o titulos', () => {
    const element = new AccionesOTitulos();
    expect(element).toElementHasName('nomina12:AccionesOTitulos');
  });

  test('horas extra', () => {
    const element = new HorasExtra();
    expect(element).toElementHasName('nomina12:HorasExtra');
  });

  test('jubilacion pension retiro', () => {
    const element = new JubilacionPensionRetiro();
    expect(element).toElementHasName('nomina12:JubilacionPensionRetiro');
  });

  test('separacion indemnizacion', () => {
    const element = new SeparacionIndemnizacion();
    expect(element).toElementHasName('nomina12:SeparacionIndemnizacion');
  });

  test('deducciones', ({ assert }) => {
    const element = new Deducciones();
    expect(element).toElementHasName('nomina12:Deducciones');
    assert.toElementHasChildMultiple(element, Deduccion);
  });

  test('deduccion', () => {
    const element = new Deduccion();
    expect(element).toElementHasName('nomina12:Deduccion');
  });

  test('otros pagos', ({ assert }) => {
    const element = new OtrosPagos();
    expect(element).toElementHasName('nomina12:OtrosPagos');
    assert.toElementHasChildMultiple(element, OtroPago);
  });

  test('otro pago', ({ assert }) => {
    const element = new OtroPago();
    expect(element).toElementHasName('nomina12:OtroPago');
    expect(element).toElementHasOrder([
      'nomina12:SubsidioAlEmpleo',
      'nomina12:CompensacionSaldosAFavor',
    ]);
    assert.toElementHasChildSingle(element, SubsidioAlEmpleo);
    assert.toElementHasChildSingle(element, CompensacionSaldosAFavor);
  });

  test('subsidio al empleo', () => {
    const element = new SubsidioAlEmpleo();
    expect(element).toElementHasName('nomina12:SubsidioAlEmpleo');
  });

  test('compensacion saldos a favor', () => {
    const element = new CompensacionSaldosAFavor();
    expect(element).toElementHasName('nomina12:CompensacionSaldosAFavor');
  });

  test('incapacidades', ({ assert }) => {
    const element = new Incapacidades();
    expect(element).toElementHasName('nomina12:Incapacidades');
    assert.toElementHasChildMultiple(element, Incapacidad);
  });

  test('incapacidad', () => {
    const element = new Incapacidad();
    expect(element).toElementHasName('nomina12:Incapacidad');
  });
});
