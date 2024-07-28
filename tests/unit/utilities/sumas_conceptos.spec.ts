import { XmlNode } from '@nodecfdi/cfdi-core';
import Comprobante from '#src/cfdi_40/comprobante';
import ImpuestosLocales from '#src/implocal_10/impuestos_locales';
import SumasConceptos from '#src/utilities/sumas_conceptos';

describe('sumas conceptos', () => {
  test('constructor', () => {
    // const maxDiff = 0.0000001;
    const sc = new SumasConceptos(new XmlNode('x'));
    expect(sc.getPrecision()).toBe(2);
    expect(sc.getSubTotal()).toBe(0);
    expect(sc.getTotal()).toBe(0);
    expect(sc.getDescuento()).toBe(0);
    expect(sc.getImpuestosRetenidos()).toBe(0);
    expect(sc.getImpuestosTrasladados()).toBe(0);
    expect(sc.getLocalesImpuestosRetenidos()).toBe(0);
    expect(sc.getLocalesImpuestosTrasladados()).toBe(0);
    expect(Object.keys(sc.getRetenciones())).toHaveLength(0);
    expect(Object.keys(sc.getTraslados())).toHaveLength(0);
    expect(Object.keys(sc.getExentos())).toHaveLength(0);
    expect(sc.getLocalesRetenciones()).toHaveLength(0);
    expect(sc.getLocalesTraslados()).toHaveLength(0);
    expect(sc.hasRetenciones()).toBeFalsy();
    expect(sc.hasTraslados()).toBeFalsy();
    expect(sc.hasExentos()).toBeFalsy();
    expect(sc.hasLocalesRetenciones()).toBeFalsy();
    expect(sc.hasLocalesTraslados()).toBeFalsy();
  });

  /*
   * The case "tax uses 1 dec" 53.4 = round(35.6 + 17.8, 2)
   * The case "tax uses 6 dec" 53.33 = round(17.7776 + 35.5552, 2)
   */
  test.each([
    ['tax uses 1 dec', 1, 333.33, 53.4, 386.73],
    ['tax uses 6 dec', 6, 333.33, 53.33, 386.66],
  ])('with concepts decimals %s', (_name, taxDecimals, subTotal, traslados, total) => {
    // const maxDiff = 0.0000001;
    const comprobante = new Comprobante();
    comprobante.addConcepto({ Importe: '111.11' }).addTraslado({
      Base: '111.11',
      Impuesto: '002',
      TipoFactor: 'Tasa',
      TasaOCuota: '0.160000',
      Importe: (111.11 * 0.16).toFixed(taxDecimals),
    });
    comprobante.addConcepto({ Importe: '222.22' }).addTraslado({
      Base: '222.22',
      Impuesto: '002',
      TipoFactor: 'Tasa',
      TasaOCuota: '0.160000',
      Importe: (222.22 * 0.16).toFixed(taxDecimals),
    });
    const sc = new SumasConceptos(comprobante, 2);
    expect(sc.getSubTotal()).toBe(subTotal);
    expect(sc.getImpuestosTrasladados()).toBe(traslados);
    expect(sc.getTotal()).toBe(total);

    // These are zero
    expect(sc.getDescuento()).toBe(0);
    expect(sc.getImpuestosRetenidos()).toBe(0);
    expect(Object.keys(sc.getRetenciones())).toHaveLength(0);
    expect(Object.keys(sc.getExentos())).toHaveLength(0);
  });

  test('with impuestos locales', () => {
    const taxDecimals = 4;
    // const maxDiff = 0.0000001;
    const comprobante = new Comprobante();
    comprobante.addConcepto({ Importe: '111.11' }).addTraslado({
      Base: '111.11',
      Impuesto: '002',
      TipoFactor: 'Tasa',
      TasaOCuota: '0.160000',
      Importe: (111.11 * 0.16).toFixed(taxDecimals),
    });
    comprobante.addConcepto({ Importe: '222.22' }).addTraslado({
      Base: '222.22',
      Impuesto: '002',
      TipoFactor: 'Tasa',
      TasaOCuota: '0.160000',
      Importe: (222.22 * 0.16).toFixed(taxDecimals),
    });

    const impuestosLocales = new ImpuestosLocales();
    impuestosLocales.addTrasladosLocales({
      ImpLocTraslado: 'IH',
      TasadeTraslado: '2.5',
      Importe: (333.33 * 0.025).toFixed(2),
    });

    comprobante.addComplemento(impuestosLocales);

    const sc = new SumasConceptos(comprobante, 2);
    expect(Object.keys(sc.getTraslados())).toHaveLength(1);
    expect(sc.hasTraslados()).toBeTruthy();
    expect(sc.getLocalesTraslados()).toHaveLength(1);

    expect(sc.getSubTotal()).toBe(333.33);
    expect(sc.getImpuestosTrasladados()).toBe(53.33);
    expect(sc.getLocalesImpuestosTrasladados()).toBe(8.33);
    expect(sc.getTotal()).toBe(394.99);

    // These are zero
    expect(sc.getDescuento()).toBe(0);
    expect(sc.getImpuestosRetenidos()).toBe(0);
    expect(Object.keys(sc.getRetenciones())).toHaveLength(0);
    expect(Object.keys(sc.getExentos())).toHaveLength(0);
    expect(sc.getLocalesImpuestosRetenidos()).toBe(0);
    expect(sc.getLocalesRetenciones()).toHaveLength(0);
  });

  test('found any concept with discount', () => {
    const comprobante = new Comprobante();
    comprobante.addConcepto({ Importe: '111.11' });
    comprobante.addConcepto({ Importe: '222.22' });
    expect(new SumasConceptos(comprobante).foundAnyConceptWithDiscount()).toBeFalsy();

    // Now add the attribute Descuento
    comprobante.addConcepto({ Importe: '333.33', Descuento: '' });
    expect(new SumasConceptos(comprobante).foundAnyConceptWithDiscount()).toBeTruthy();
  });

  test('impuesto importe with more decimals than the precision is rounded', () => {
    const comprobante = new Comprobante();
    comprobante.addConcepto().addTraslado({
      Base: '48.611106',
      Importe: '7.777777',
      Impuesto: '002',
      TipoFactor: 'Tasa',
      TasaOCuota: '0.160000',
    });
    comprobante.addConcepto().addTraslado({
      Base: '13.888888',
      Importe: '2.222222',
      Impuesto: '002',
      TipoFactor: 'Tasa',
      TasaOCuota: '0.160000',
    });

    const sc = new SumasConceptos(comprobante, 3);
    expect(sc.hasTraslados()).toBeTruthy();
    expect(sc.getImpuestosTrasladados()).toBe(10);
    expect(sc.getTraslados()['002:Tasa:0.160000'].Importe).toBe(10);
    expect(sc.getTraslados()['002:Tasa:0.160000'].Base).toBe(62.5);
  });

  test('impuesto with traslados and exento', () => {
    const comprobante = new Comprobante();
    comprobante
      .addConcepto()
      .multiTraslado(
        { Impuesto: '002', TipoFactor: 'Exento', Base: '1000' },
        { Impuesto: '002', TipoFactor: 'Tasa', TasaOCuota: '0.160000', Base: '1000', Importe: 160 },
      );
    comprobante.addConcepto().addTraslado({
      Impuesto: '002',
      TipoFactor: 'Tasa',
      TasaOCuota: '0.160000',
      Base: '1000',
      Importe: '160',
    });
    comprobante.addConcepto().addTraslado({
      Impuesto: '002',
      TipoFactor: 'Exento',
      Base: '234.56',
    });

    const sc = new SumasConceptos(comprobante, 2);
    expect(sc.hasTraslados()).toBeTruthy();
    expect(sc.getImpuestosTrasladados()).toBe(320);
    expect(Object.keys(sc.getTraslados())).toHaveLength(1);

    expect(sc.hasExentos()).toBeTruthy();
    expect(Object.keys(sc.getExentos())).toHaveLength(1);
    expect(Object.values(sc.getExentos()).reduce((a, b) => a + b.Base, 0)).toBe(1234.56);
  });

  test('impuesto with traslados and only exentos without base', () => {
    const comprobante = new Comprobante();
    comprobante.addConcepto().multiTraslado({ Impuesto: '002', TipoFactor: 'Exento' });
    comprobante.addConcepto().multiTraslado({ Impuesto: '002', TipoFactor: 'Exento' });

    const sc = new SumasConceptos(comprobante, 2);
    expect(sc.hasTraslados()).toBeFalsy();
    expect(sc.getImpuestosTrasladados()).toBe(0);
    expect(Object.keys(sc.getTraslados())).toHaveLength(0);

    expect(sc.hasExentos()).toBeTruthy();
    expect(Object.values(sc.getExentos()).reduce((a, b) => a + b.Base, 0)).toBe(0);
  });

  test('impuesto with traslados and only exentos with base', () => {
    const comprobante = new Comprobante();
    comprobante
      .addConcepto()
      .multiTraslado({ Impuesto: '002', TipoFactor: 'Exento', Base: '123.45' });
    comprobante
      .addConcepto()
      .multiTraslado(
        { Impuesto: '002', TipoFactor: 'Exento', Base: '543.21' },
        { Impuesto: '001', TipoFactor: 'Exento', Base: '100' },
      );
    comprobante.addConcepto().multiTraslado({ Impuesto: '001', TipoFactor: 'Exento', Base: '150' });

    const sc = new SumasConceptos(comprobante, 2);
    expect(sc.hasTraslados()).toBeFalsy();
    expect(sc.getImpuestosTrasladados()).toBe(0);
    expect(Object.keys(sc.getTraslados())).toHaveLength(0);
    expect(sc.hasExentos()).toBeTruthy();

    const exentos001 = Object.values(sc.getExentos()).filter((val) => val.Impuesto === '001');
    expect(exentos001.reduce((a, b) => a + b.Base, 0)).toBe(250);

    const exentos002 = Object.values(sc.getExentos()).filter((val) => val.Impuesto === '002');
    expect(exentos002.reduce((a, b) => a + b.Base, 0)).toBeCloseTo(666.66, 6);
  });
});
