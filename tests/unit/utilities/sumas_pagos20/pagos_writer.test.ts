import { XmlNode } from '@nodecfdi/cfdi-core';
import { describe, expect, test } from 'vitest';
import { Pagos as ElementPagos } from '../../../../src/elements/pago_20/index';
import { Calculator } from '../../../../src/utilities/sumas_pagos20/calculator';
import { PagosWriter } from '../../../../src/utilities/sumas_pagos20/pagos_writer';

describe('sumas pagos20 pagos writer', () => {
  test('constructor requires a pago20:Pagos element', () => {
    expect(() => new PagosWriter(new XmlNode('pago20:Pagos'))).toThrow(TypeError);
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
