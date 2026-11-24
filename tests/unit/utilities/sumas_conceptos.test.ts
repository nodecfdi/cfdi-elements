import { Decimal, XmlNode } from '@nodecfdi/cfdi-core';
import { describe, expect, test } from 'vitest';
import { Comprobante } from '../../../src/elements/cfdi_40/index';
import { ImpuestosLocales } from '../../../src/elements/implocal_10/index';
import { SumasConceptos } from '../../../src/utilities/sumas_conceptos';

describe('sumas conceptos', () => {
  test('constructor', () => {
    const sc = new SumasConceptos(new XmlNode('x'));
    expect(sc.getPrecision()).toBe(2);
    expect(sc.getSubTotal()).toStrictEqual(new Decimal(0));
    expect(sc.getTotal()).toStrictEqual(new Decimal(0));
    expect(sc.getDescuento()).toStrictEqual(new Decimal(0));
    expect(sc.getImpuestosRetenidos()).toStrictEqual(new Decimal(0));
    expect(sc.getImpuestosTrasladados()).toStrictEqual(new Decimal(0));
    expect(sc.getLocalesImpuestosRetenidos()).toStrictEqual(new Decimal(0));
    expect(sc.getLocalesImpuestosTrasladados()).toStrictEqual(new Decimal(0));
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
    ['tax uses 1 dec', 1, '333.33', '53.4', '386.73'],
    ['tax uses 6 dec', 6, '333.33', '53.33', '386.66'],
  ])('with concepts decimals %s', (_name, taxDecimals, subTotal, traslados, total) => {
    const comprobante = new Comprobante();
    comprobante.addConcepto({ Importe: '111.11' }).addTraslado({
      Base: '111.11',
      Impuesto: '002',
      TipoFactor: 'Tasa',
      TasaOCuota: '0.160000',
      Importe: new Decimal('111.11').times('0.16').toFixed(taxDecimals),
    });
    comprobante.addConcepto({ Importe: '222.22' }).addTraslado({
      Base: '222.22',
      Impuesto: '002',
      TipoFactor: 'Tasa',
      TasaOCuota: '0.160000',
      Importe: new Decimal('222.22').times('0.16').toFixed(taxDecimals),
    });
    const sc = new SumasConceptos(comprobante, 2);
    expect(sc.getSubTotal()).toStrictEqual(new Decimal(subTotal));
    expect(sc.getImpuestosTrasladados()).toStrictEqual(new Decimal(traslados));
    expect(sc.getTotal()).toStrictEqual(new Decimal(total));

    // These are zero
    expect(sc.getDescuento()).toStrictEqual(new Decimal(0));
    expect(sc.getImpuestosRetenidos()).toStrictEqual(new Decimal(0));
    expect(Object.keys(sc.getRetenciones())).toHaveLength(0);
    expect(Object.keys(sc.getExentos())).toHaveLength(0);
  });

  test('with impuestos locales', () => {
    const taxDecimals = 4;
    const comprobante = new Comprobante();
    comprobante.addConcepto({ Importe: '111.11' }).addTraslado({
      Base: '111.11',
      Impuesto: '002',
      TipoFactor: 'Tasa',
      TasaOCuota: '0.160000',
      Importe: new Decimal('111.11').times('0.16').toFixed(taxDecimals),
    });
    comprobante.addConcepto({ Importe: '222.22' }).addTraslado({
      Base: '222.22',
      Impuesto: '002',
      TipoFactor: 'Tasa',
      TasaOCuota: '0.160000',
      Importe: new Decimal('222.22').times('0.16').toFixed(taxDecimals),
    });

    const impuestosLocales = new ImpuestosLocales();
    impuestosLocales.addTrasladosLocales({
      ImpLocTraslado: 'IH',
      TasadeTraslado: '2.5',
      Importe: new Decimal('333.33').times('0.025').toFixed(2),
    });

    comprobante.addComplemento(impuestosLocales);

    const sc = new SumasConceptos(comprobante, 2);
    expect(Object.keys(sc.getTraslados())).toHaveLength(1);
    expect(sc.hasTraslados()).toBeTruthy();
    expect(sc.getLocalesTraslados()).toHaveLength(1);

    expect(sc.getSubTotal()).toStrictEqual(new Decimal('333.33'));
    expect(sc.getImpuestosTrasladados()).toStrictEqual(new Decimal('53.33'));
    expect(sc.getLocalesImpuestosTrasladados()).toStrictEqual(new Decimal('8.33'));
    expect(sc.getTotal()).toStrictEqual(new Decimal('394.99'));

    // These are zero
    expect(sc.getDescuento()).toStrictEqual(new Decimal(0));
    expect(sc.getImpuestosRetenidos()).toStrictEqual(new Decimal(0));
    expect(Object.keys(sc.getRetenciones())).toHaveLength(0);
    expect(Object.keys(sc.getExentos())).toHaveLength(0);
    expect(sc.getLocalesImpuestosRetenidos()).toStrictEqual(new Decimal(0));
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
    expect(sc.getImpuestosTrasladados()).toStrictEqual(new Decimal(10));
    expect(sc.getTraslados()['002:Tasa:0.160000'].Importe).toStrictEqual(new Decimal(10));
    expect(sc.getTraslados()['002:Tasa:0.160000'].Base).toStrictEqual(new Decimal('62.5'));
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
    expect(sc.getImpuestosTrasladados()).toStrictEqual(new Decimal(320));
    expect(Object.keys(sc.getTraslados())).toHaveLength(1);

    expect(sc.hasExentos()).toBeTruthy();
    expect(Object.keys(sc.getExentos())).toHaveLength(1);
    expect(
      Object.values(sc.getExentos()).reduce((a, b) => a.plus(b.Base), new Decimal(0)),
    ).toStrictEqual(new Decimal('1234.56'));
  });

  test('impuesto with traslados and only exentos without base', () => {
    const comprobante = new Comprobante();
    comprobante.addConcepto().multiTraslado({ Impuesto: '002', TipoFactor: 'Exento' });
    comprobante.addConcepto().multiTraslado({ Impuesto: '002', TipoFactor: 'Exento' });

    const sc = new SumasConceptos(comprobante, 2);
    expect(sc.hasTraslados()).toBeFalsy();
    expect(sc.getImpuestosTrasladados()).toStrictEqual(new Decimal(0));
    expect(Object.keys(sc.getTraslados())).toHaveLength(0);

    expect(sc.hasExentos()).toBeTruthy();
    expect(
      Object.values(sc.getExentos()).reduce((a, b) => a.plus(b.Base), new Decimal(0)),
    ).toStrictEqual(new Decimal(0));
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
    expect(sc.getImpuestosTrasladados()).toStrictEqual(new Decimal(0));
    expect(Object.keys(sc.getTraslados())).toHaveLength(0);
    expect(sc.hasExentos()).toBeTruthy();

    const exentos001 = Object.values(sc.getExentos()).filter((val) => val.Impuesto === '001');
    expect(exentos001.reduce((a, b) => a.plus(b.Base), new Decimal(0))).toStrictEqual(
      new Decimal(250),
    );

    const exentos002 = Object.values(sc.getExentos()).filter((val) => val.Impuesto === '002');
    expect(exentos002.reduce((a, b) => a.plus(b.Base), new Decimal(0))).toStrictEqual(
      new Decimal('666.66'),
    );
  });

  test('avoids floating point precision issues in sums and halfway rounding', () => {
    const comprobante = new Comprobante();
    // In IEEE 754: 1.13 + 0.005 = 1.1349999999999998 (would wrongly round to 1.13)
    comprobante.addConcepto({ Importe: '1.13' }).addTraslado({
      Base: '1.002',
      Importe: '0.10',
      Impuesto: '002',
      TipoFactor: 'Tasa',
      TasaOCuota: '0.160000',
    });
    comprobante.addConcepto({ Importe: '0.005' }).addTraslado({
      Base: '0.003',
      Importe: '0.20',
      Impuesto: '002',
      TipoFactor: 'Tasa',
      TasaOCuota: '0.160000',
    });

    const implocal = new ImpuestosLocales();
    implocal.addTrasladosLocales({ ImpLocTraslado: 'IH', TasadeTraslado: '2.5', Importe: '0.10' });
    implocal.addTrasladosLocales({ ImpLocTraslado: 'IH', TasadeTraslado: '2.5', Importe: '0.20' });
    comprobante.addComplemento(implocal);

    const sc = new SumasConceptos(comprobante, 2);
    expect(sc.getSubTotal()).toStrictEqual(new Decimal('1.14'));
    expect(sc.getTraslados()['002:Tasa:0.160000'].Base).toStrictEqual(new Decimal('1.01'));
    expect(sc.getTraslados()['002:Tasa:0.160000'].Importe).toStrictEqual(new Decimal('0.3'));
    expect(sc.getImpuestosTrasladados()).toStrictEqual(new Decimal('0.3'));
    expect(sc.getLocalesImpuestosTrasladados()).toStrictEqual(new Decimal('0.3'));
    expect(sc.getTotal()).toStrictEqual(new Decimal('1.74'));
  });

  test('retenciones with the same impuesto are summarized', () => {
    const comprobante = new Comprobante();
    comprobante.addConcepto({ Importe: '1000.00' }).addRetencion({
      Base: '1000.00',
      Impuesto: '001',
      TipoFactor: 'Tasa',
      TasaOCuota: '0.100000',
      Importe: '100.00',
    });
    comprobante.addConcepto({ Importe: '500.00' }).addRetencion({
      Base: '500.00',
      Impuesto: '001',
      TipoFactor: 'Tasa',
      TasaOCuota: '0.100000',
      Importe: '50.00',
    });
    comprobante.addConcepto({ Importe: '200.00' }).addRetencion({
      Base: '200.00',
      Impuesto: '002',
      TipoFactor: 'Tasa',
      TasaOCuota: '0.106667',
      Importe: '21.33',
    });

    const sc = new SumasConceptos(comprobante, 2);
    expect(sc.hasRetenciones()).toBeTruthy();
    expect(sc.getRetenciones()).toStrictEqual({
      '001::': { Impuesto: '001', Importe: new Decimal('150') },
      '002::': { Impuesto: '002', Importe: new Decimal('21.33') },
    });
    expect(sc.getImpuestosRetenidos()).toStrictEqual(new Decimal('171.33'));
    expect(sc.getTotal()).toStrictEqual(new Decimal('1528.67'));
  });

  test('handles invalid or non-finite numeric attribute values as zero', () => {
    const comprobante = new Comprobante();
    comprobante.addConcepto({ Importe: 'invalid', Descuento: 'NaN' });
    comprobante.addConcepto({ Importe: 'Infinity', Descuento: ' ' });
    comprobante.addConcepto({ Importe: '10.50' });

    const sc = new SumasConceptos(comprobante, 2);
    expect(sc.getSubTotal()).toStrictEqual(new Decimal('10.5'));
    expect(sc.getDescuento()).toStrictEqual(new Decimal(0));
    expect(sc.getTotal()).toStrictEqual(new Decimal('10.5'));
  });
});
