import { describe, expect, test } from 'vitest';
import {
  DatosAdquiriente,
  DatosAdquirienteCopSC,
  DatosAdquirientesCopSC,
  DatosEnajenante,
  DatosEnajenanteCopSC,
  DatosEnajenantesCopSC,
  DatosNotario,
  DatosOperacion,
  DatosUnAdquiriente,
  DatosUnEnajenante,
  DescInmueble,
  DescInmuebles,
  NotariosPublicos,
} from '../../../../src/elements/notariospublicos_10/index';

describe('notariospublicos10', () => {
  test('notarios publicos', ({ assert }) => {
    const element = new NotariosPublicos();
    expect(element).toElementHasName('notariospublicos:NotariosPublicos');
    expect(element).toElementHasOrder([
      'notariospublicos:DescInmuebles',
      'notariospublicos:DatosOperacion',
      'notariospublicos:DatosNotario',
      'notariospublicos:DatosEnajenante',
      'notariospublicos:DatosAdquiriente',
    ]);
    expect(element).toElementHasFixedAttributes({
      'xmlns:notariospublicos': 'http://www.sat.gob.mx/notariospublicos',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xsi:schemaLocation': 'http://www.sat.gob.mx/notariospublicos http://www.sat.gob.mx/sitio_internet/cfd/notariospublicos/notariospublicos.xsd',
      'Version': '1.0',
    });
    assert.toElementHasChildSingle(element, DescInmuebles);
    assert.toElementHasChildSingle(element, DatosOperacion);
    assert.toElementHasChildSingle(element, DatosNotario);
    assert.toElementHasChildSingle(element, DatosEnajenante);
    assert.toElementHasChildSingle(element, DatosAdquiriente);
  });

  test('desc inmuebles', ({ assert }) => {
    const element = new DescInmuebles();
    expect(element).toElementHasName('notariospublicos:DescInmuebles');
    assert.toElementHasChildMultiple(element, DescInmueble);
  });

  test('desc inmueble', () => {
    const element = new DescInmueble();
    expect(element).toElementHasName('notariospublicos:DescInmueble');
  });

  test('datos operacion', () => {
    const element = new DatosOperacion();
    expect(element).toElementHasName('notariospublicos:DatosOperacion');
  });

  test('datos notario', () => {
    const element = new DatosNotario();
    expect(element).toElementHasName('notariospublicos:DatosNotario');
  });

  test('datos enajenante', ({ assert }) => {
    const element = new DatosEnajenante();
    expect(element).toElementHasName('notariospublicos:DatosEnajenante');
    expect(element).toElementHasOrder([
      'notariospublicos:DatosUnEnajenante',
      'notariospublicos:DatosEnajenantesCopSC',
    ]);
    assert.toElementHasChildSingle(element, DatosUnEnajenante);
    assert.toElementHasChildSingle(element, DatosEnajenantesCopSC);
  });

  test('datos un enajenante', () => {
    const element = new DatosUnEnajenante();
    expect(element).toElementHasName('notariospublicos:DatosUnEnajenante');
  });

  test('datos enajenantes cop sc', ({ assert }) => {
    const element = new DatosEnajenantesCopSC();
    expect(element).toElementHasName('notariospublicos:DatosEnajenantesCopSC');
    assert.toElementHasChildMultiple(element, DatosEnajenanteCopSC);
  });

  test('datos enajenante cop sc', () => {
    const element = new DatosEnajenanteCopSC();
    expect(element).toElementHasName('notariospublicos:DatosEnajenanteCopSC');
  });

  test('datos adquiriente', ({ assert }) => {
    const element = new DatosAdquiriente();
    expect(element).toElementHasName('notariospublicos:DatosAdquiriente');
    expect(element).toElementHasOrder([
      'notariospublicos:DatosUnAdquiriente',
      'notariospublicos:DatosAdquirientesCopSC',
    ]);
    assert.toElementHasChildSingle(element, DatosUnAdquiriente);
    assert.toElementHasChildSingle(element, DatosAdquirientesCopSC);
  });

  test('datos un adquiriente', () => {
    const element = new DatosUnAdquiriente();
    expect(element).toElementHasName('notariospublicos:DatosUnAdquiriente');
  });

  test('datos adquirientes cop sc', ({ assert }) => {
    const element = new DatosAdquirientesCopSC();
    expect(element).toElementHasName('notariospublicos:DatosAdquirientesCopSC');
    assert.toElementHasChildMultiple(element, DatosAdquirienteCopSC);
  });

  test('datos adquiriente cop sc', () => {
    const element = new DatosAdquirienteCopSC();
    expect(element).toElementHasName('notariospublicos:DatosAdquirienteCopSC');
  });
});
