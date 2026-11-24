import { XmlNode } from '@nodecfdi/cfdi-core';
import { describe, expect, test } from 'vitest';
import { Pagos as ElementPagos } from '../../../../src/elements/pago_20/index';
import { Calculator } from '../../../../src/utilities/sumas_pagos20/calculator';
import { PagosWriter } from '../../../../src/utilities/sumas_pagos20/pagos_writer';

describe('sumas pagos20 pagos writer', () => {
  test('constructor requires a pago20:Pagos element', () => {
    expect(() => new PagosWriter(new XmlNode('pago20:Pagos'))).toThrow(TypeError);
  });

  test('constructor properties', () => {
    const pagos = new ElementPagos();
    const calculator = new Calculator(4);
    const writer = new PagosWriter(pagos, calculator);
    expect(writer.getPagos()).toBe(pagos);
    expect(writer.getCalculator()).toBe(calculator);
  });

  test('constructor creates a default calculator', () => {
    const writer = new PagosWriter(new ElementPagos());
    expect(writer.getCalculator()).toBeInstanceOf(Calculator);
    expect(writer.getCalculator().getPaymentTaxesPrecision()).toBe(6);
  });

  test('put throws when a pago20:Pago is not a Pago element', () => {
    const pagos = new ElementPagos();
    pagos.addChild(new XmlNode('pago20:Pago', { MonedaP: 'MXN', TipoCambioP: '1' }));
    const calculator = new Calculator();
    const result = calculator.calculate(pagos);

    const writer = new PagosWriter(pagos, calculator);
    expect(() => {
      writer.put(result);
    }).toThrow('Cannot work with a pago20:Pago of class XmlNode');
  });

  test('write pago with only retenciones does not write traslados', () => {
    const pagos = new ElementPagos();
    const pago = pagos.addPago({ MonedaP: 'MXN', TipoCambioP: '1', Monto: '900.00' });
    pago
      .addDoctoRelacionado({ MonedaDR: 'MXN', EquivalenciaDR: '1', ImpPagado: '900.00' })
      .getImpuestosDR()
      .getRetencionesDR()
      .addRetencionDR({
        BaseDR: '1000.00',
        ImpuestoDR: '001',
        TipoFactorDR: 'Tasa',
        TasaOCuotaDR: '0.100000',
        ImporteDR: '100.00',
      });

    PagosWriter.calculateAndPut(pagos);

    expect(pago.getAttribute('Monto')).toBe('900.00');
    expect(pago.searchNode('pago20:ImpuestosP', 'pago20:TrasladosP')).toBeUndefined();
    expect(pago.searchNodes('pago20:ImpuestosP', 'pago20:RetencionesP', 'pago20:RetencionP')).toHaveLength(1);
    expect(pagos.searchNode('pago20:Totales')?.attributes().export()).toStrictEqual({
      MontoTotalPagos: '900.00',
      TotalRetencionesISR: '100.00',
    });
  });

  test('put replaces previous totales and impuestos', () => {
    const pagos = new ElementPagos();
    const pago = pagos.addPago({ MonedaP: 'MXN', TipoCambioP: '1' });
    pago
      .addDoctoRelacionado({ MonedaDR: 'MXN', EquivalenciaDR: '1', ImpPagado: '116.00' })
      .getImpuestosDR()
      .getTrasladosDR()
      .addTrasladoDR({
        BaseDR: '100.00',
        ImpuestoDR: '002',
        TipoFactorDR: 'Tasa',
        TasaOCuotaDR: '0.160000',
        ImporteDR: '16.00',
      });
    // previous values that must be replaced
    pagos.addTotales({ MontoTotalPagos: '1.00', TotalRetencionesIVA: '1.00' });
    pago.getImpuestosP().getRetencionesP().addRetencionP({ ImpuestoP: '002', ImporteP: '1.00' });

    PagosWriter.calculateAndPut(pagos);
    PagosWriter.calculateAndPut(pagos);

    expect(pagos.searchNodes('pago20:Totales')).toHaveLength(1);
    expect(pagos.searchNode('pago20:Totales')?.attributes().export()).toStrictEqual({
      MontoTotalPagos: '116.00',
      TotalTrasladosBaseIVA16: '100.00',
      TotalTrasladosImpuestoIVA16: '16.00',
    });
    expect(pago.searchNodes('pago20:ImpuestosP')).toHaveLength(1);
    expect(pago.searchNode('pago20:ImpuestosP', 'pago20:RetencionesP')).toBeUndefined();
    expect(pago.searchNodes('pago20:ImpuestosP', 'pago20:TrasladosP', 'pago20:TrasladoP')).toHaveLength(1);
  });

  test('write pago with only one exento', () => {
    const pagos = new ElementPagos();
    const pago = pagos.addPago({
      FechaPago: '2025-06-24',
      FormaDePagoP: '03',
      MonedaP: 'MXN',
      TipoCambioP: '1',
      Monto: '10.00',
    });
    pago
      .addDoctoRelacionado({
        IdDocumento: '00000000-1111-2222-3333-00000000000A',
        MonedaDR: 'MXN',
        EquivalenciaDR: '1',
        NumParcialidad: '1',
        ImpSaldoAnt: '4500.00',
        ImpPagado: '10.00',
        ImpSaldoInsoluto: '4490.00',
        ObjetoImpDR: '02',
      })
      .getImpuestosDR()
      .getTrasladosDR()
      .addTrasladoDR({ BaseDR: '10.00', ImpuestoDR: '002', TipoFactorDR: 'Exento' });

    const calculator = new Calculator(2);
    const result = calculator.calculate(pagos);

    const writer = new PagosWriter(pagos, calculator);
    writer.writePago(pago, result.getPago(0));

    const traslado = pagos.searchNode('pago20:Pago', 'pago20:ImpuestosP', 'pago20:TrasladosP', 'pago20:TrasladoP');
    expect(traslado?.hasAttribute('TasaOCuotaP')).toBeFalsy();
    expect(traslado?.hasAttribute('ImporteP')).toBeFalsy();
    expect(traslado?.getAttribute('ImpuestoP')).toBe('002');
    expect(traslado?.getAttribute('BaseP')).toBe('10.00');
  });

  test('calculate and put', () => {
    const pagos = new ElementPagos();
    const pago = pagos.addPago({ MonedaP: 'MXN', TipoCambioP: '1' });
    const impuestosDr = pago
      .addDoctoRelacionado({ MonedaDR: 'MXN', EquivalenciaDR: '1', ImpPagado: '1160.00' })
      .getImpuestosDR();
    impuestosDr.getTrasladosDR().addTrasladoDR({
      BaseDR: '1000.00',
      ImpuestoDR: '002',
      TipoFactorDR: 'Tasa',
      TasaOCuotaDR: '0.160000',
      ImporteDR: '160.00',
    });
    impuestosDr.getRetencionesDR().addRetencionDR({
      BaseDR: '1000.00',
      ImpuestoDR: '001',
      TipoFactorDR: 'Tasa',
      TasaOCuotaDR: '0.100000',
      ImporteDR: '100.00',
    });

    PagosWriter.calculateAndPut(pagos);

    expect(pago.getAttribute('Monto')).toBe('1160.00');

    const totales = pagos.searchNode('pago20:Totales');
    expect(totales?.attributes().export()).toStrictEqual({
      MontoTotalPagos: '1160.00',
      TotalRetencionesISR: '100.00',
      TotalTrasladosBaseIVA16: '1000.00',
      TotalTrasladosImpuestoIVA16: '160.00',
    });

    const traslado = pago.searchNode('pago20:ImpuestosP', 'pago20:TrasladosP', 'pago20:TrasladoP');
    expect(traslado?.attributes().export()).toStrictEqual({
      BaseP: '1000.000000',
      ImpuestoP: '002',
      TipoFactorP: 'Tasa',
      TasaOCuotaP: '0.160000',
      ImporteP: '160.000000',
    });

    const retencion = pago.searchNode('pago20:ImpuestosP', 'pago20:RetencionesP', 'pago20:RetencionP');
    expect(retencion?.attributes().export()).toStrictEqual({
      ImpuestoP: '001',
      ImporteP: '100.000000',
    });
  });
});
