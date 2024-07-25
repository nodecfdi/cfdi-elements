import DoctoRelacionado from '#src/pagos_20/docto_relacionado';
import ImpuestosDR from '#src/pagos_20/impuestos_dr';
import ImpuestosP from '#src/pagos_20/impuestos_p';
import Pago from '#src/pagos_20/pago';
import Pagos from '#src/pagos_20/pagos';
import RetencionDR from '#src/pagos_20/retencion_dr';
import RetencionP from '#src/pagos_20/retencion_p';
import RetencionesDR from '#src/pagos_20/retenciones_dr';
import RetencionesP from '#src/pagos_20/retenciones_p';
import Totales from '#src/pagos_20/totales';
import TrasladoDR from '#src/pagos_20/traslado_dr';
import TrasladoP from '#src/pagos_20/traslado_p';
import TrasladosDR from '#src/pagos_20/traslados_dr';
import TrasladosP from '#src/pagos_20/traslados_p';

describe('pagos20', () => {
  test('pagos', ({ assert }) => {
    const element = new Pagos();
    expect(element).toElementHasName('pago20:Pagos');
    expect(element).toElementHasFixedAttributes({
      'xmlns:pago20': 'http://www.sat.gob.mx/Pagos20',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xsi:schemaLocation':
        'http://www.sat.gob.mx/Pagos20 http://www.sat.gob.mx/sitio_internet/cfd/Pagos/Pagos20.xsd',
      'Version': '2.0',
    });
    assert.toElementHasChildSingle(element, Totales);
    assert.toElementHasChildMultiple(element, Pago);
  });

  test('totales', () => {
    const element = new Totales();
    expect(element).toElementHasName('pago20:Totales');
  });

  test('pago', ({ assert }) => {
    const element = new Pago();
    expect(element).toElementHasName('pago20:Pago');
    expect(element).toElementHasOrder(['pago20:DoctoRelacionado', 'pago20:ImpuestosP']);
    assert.toElementHasChildMultiple(element, DoctoRelacionado);
    assert.toElementHasChildSingle(element, ImpuestosP);
  });

  test('docto relacionado', ({ assert }) => {
    const element = new DoctoRelacionado();
    expect(element).toElementHasName('pago20:DoctoRelacionado');
    assert.toElementHasChildSingle(element, ImpuestosDR);
  });

  test('impuestos d r', ({ assert }) => {
    const element = new ImpuestosDR();
    expect(element).toElementHasName('pago20:ImpuestosDR');
    expect(element).toElementHasOrder(['pago20:RetencionesDR', 'pago20:TrasladosDR']);
    assert.toElementHasChildSingle(element, RetencionesDR);
    assert.toElementHasChildSingle(element, TrasladosDR);
  });

  test('retenciones d r', ({ assert }) => {
    const element = new RetencionesDR();
    expect(element).toElementHasName('pago20:RetencionesDR');
    assert.toElementHasChildMultiple(element, RetencionDR);
  });

  test('retencion d r', () => {
    const element = new RetencionDR();
    expect(element).toElementHasName('pago20:RetencionDR');
  });

  test('traslados d r', ({ assert }) => {
    const element = new TrasladosDR();
    expect(element).toElementHasName('pago20:TrasladosDR');
    assert.toElementHasChildMultiple(element, TrasladoDR);
  });

  test('traslado d r', () => {
    const element = new TrasladoDR();
    expect(element).toElementHasName('pago20:TrasladoDR');
  });

  test('impuestos p', ({ assert }) => {
    const element = new ImpuestosP();
    expect(element).toElementHasName('pago20:ImpuestosP');
    expect(element).toElementHasOrder(['pago20:RetencionesP', 'pago20:TrasladosP']);
    assert.toElementHasChildSingle(element, RetencionesP);
    assert.toElementHasChildSingle(element, TrasladosP);
  });

  test('retenciones p', ({ assert }) => {
    const element = new RetencionesP();
    expect(element).toElementHasName('pago20:RetencionesP');
    assert.toElementHasChildMultiple(element, RetencionP);
  });

  test('retencion p', () => {
    const element = new RetencionP();
    expect(element).toElementHasName('pago20:RetencionP');
  });

  test('traslados p', ({ assert }) => {
    const element = new TrasladosP();
    expect(element).toElementHasName('pago20:TrasladosP');
    assert.toElementHasChildMultiple(element, TrasladoP);
  });

  test('traslado p', () => {
    const element = new TrasladoP();
    expect(element).toElementHasName('pago20:TrasladoP');
  });
});
