import { Decimal, nodeFromXmlString } from '@nodecfdi/cfdi-core';
import { describe, expect, test } from 'vitest';
import { Calculator } from '../../../../src/utilities/sumas_pagos20/calculator';
import { Currencies } from '../../../../src/utilities/sumas_pagos20/currencies';
import { fileContents } from '../../../../test_helpers/test_utils';

const minimalXml = fileContents('pagos20-calculator/calculator-minimal.xml');

describe('sumas pagos20 calculator', () => {
  test('default properties', () => {
    const calculator = new Calculator();
    expect(calculator.getPaymentTaxesPrecision()).toBe(6);
    expect(calculator.getCurrencies()).toBeInstanceOf(Currencies);
    expect(calculator.areTaxesRounded()).toBeTruthy();
    expect(calculator.areTaxesTruncated()).toBeFalsy();
  });

  test('properties', () => {
    const currencies = new Currencies({ MXN: 2 });
    const calculator = new Calculator(4, currencies);
    expect(calculator.getPaymentTaxesPrecision()).toBe(4);
    expect(calculator.getCurrencies()).toBe(currencies);
  });

  test('precision is bounded between 0 and 6', () => {
    expect(new Calculator(10).getPaymentTaxesPrecision()).toBe(6);
    expect(new Calculator(-1).getPaymentTaxesPrecision()).toBe(0);
  });

  test('taxes rounded property', () => {
    const calculator = new Calculator();
    calculator.setTaxesTruncated();
    expect(calculator.areTaxesRounded()).toBeFalsy();
    expect(calculator.areTaxesTruncated()).toBeTruthy();

    calculator.setTaxesRounded();
    expect(calculator.areTaxesRounded()).toBeTruthy();
    expect(calculator.areTaxesTruncated()).toBeFalsy();
  });

  test('change properties', () => {
    const calculator = new Calculator();
    calculator.setPaymentTaxesPrecision(4);
    expect(calculator.getPaymentTaxesPrecision()).toBe(4);

    const currencies = new Currencies({ MXN: 2 });
    calculator.setCurrencies(currencies);
    expect(calculator.getCurrencies()).toBe(currencies);
  });

  test('calculate minimal rounded', () => {
    const pagos = nodeFromXmlString(minimalXml);

    let result = new Calculator().calculate(pagos);
    expect(result.getTotales().getTotal()).toStrictEqual(new Decimal('0.14'));
    expect(result.getTotales().getTrasladoIva16Base()).toStrictEqual(new Decimal('0.12'));
    expect(result.getTotales().getTrasladoIva16Importe()).toStrictEqual(new Decimal('0.02'));

    let impuesto = result.getPago(0).getImpuestos().getTraslado('002', 'Tasa', '0.160000');
    expect(impuesto.getBase()).toStrictEqual(new Decimal('0.123457'));
    expect(impuesto.getImporte()).toStrictEqual(new Decimal('0.019753'));

    result = new Calculator(4).calculate(pagos);
    impuesto = result.getPago(0).getImpuestos().getTraslado('002', 'Tasa', '0.160000');
    expect(impuesto.getBase()).toStrictEqual(new Decimal('0.1235'));
    expect(impuesto.getImporte()).toStrictEqual(new Decimal('0.0198'));
  });

  test('calculate minimal truncated', () => {
    const pagos = nodeFromXmlString(minimalXml);

    const calculator = new Calculator(4);
    calculator.setTaxesTruncated();
    const result = calculator.calculate(pagos);
    const impuesto = result.getPago(0).getImpuestos().getTraslado('002', 'Tasa', '0.160000');
    expect(impuesto.getBase()).toStrictEqual(new Decimal('0.1234'));
    expect(impuesto.getImporte()).toStrictEqual(new Decimal('0.0197'));
  });

  test('calculate two documents', () => {
    const pagos = nodeFromXmlString(fileContents('pagos20-calculator/calculator-two-documents.xml'));

    const result = new Calculator().calculate(pagos);
    expect(result.getTotales().getTotal()).toStrictEqual(new Decimal('1.57'));
    expect(result.getTotales().getTrasladoIva16Base()).toStrictEqual(new Decimal('1.36'));
    expect(result.getTotales().getTrasladoIva16Importe()).toStrictEqual(new Decimal('0.22'));

    const impuesto = result.getPago(0).getImpuestos().getTraslado('002', 'Tasa', '0.160000');
    expect(impuesto.getBase()).toStrictEqual(new Decimal('1.358025'));
    expect(impuesto.getImporte()).toStrictEqual(new Decimal('0.217284'));
  });

  test('calculate multiple documents traslados and retenciones', () => {
    const pagos = nodeFromXmlString(fileContents('pagos20-calculator/calculator-multiple-documents-traslados-retenciones.xml'));

    const result = new Calculator(6).calculate(pagos);
    expect(result.getTotales().getTotal()).toStrictEqual(new Decimal('1200'));
    expect(result.getTotales().getTrasladoIva16Base()).toStrictEqual(new Decimal('1200'));
    expect(result.getTotales().getTrasladoIva16Importe()).toStrictEqual(new Decimal('192'));
    expect(result.getTotales().getRetencionIva()).toStrictEqual(new Decimal('41.75'));

    expect(result.getPago(0).getImpuestos().getRetencion('002').getImporte()).toStrictEqual(
      new Decimal('35.752'),
    );
    let traslado = result.getPago(0).getImpuestos().getTraslado('002', 'Tasa', '0.160000');
    expect(traslado.getBase()).toStrictEqual(new Decimal('1000'));
    expect(traslado.getImporte()).toStrictEqual(new Decimal('160'));

    expect(result.getPago(1).getImpuestos().getRetencion('002').getImporte()).toStrictEqual(
      new Decimal('6'),
    );
    traslado = result.getPago(1).getImpuestos().getTraslado('002', 'Tasa', '0.160000');
    expect(traslado.getBase()).toStrictEqual(new Decimal('200'));
    expect(traslado.getImporte()).toStrictEqual(new Decimal('32'));
  });

  test('calculate payment usd with doctos mxn and usd', () => {
    const pagos = nodeFromXmlString(fileContents('pagos20-calculator/calculator-payment-usd-doctos-mxn-usd.xml'));

    const result = new Calculator().calculate(pagos);

    // JSON round trip is required to apply toJSON serialization
    // eslint-disable-next-line unicorn/prefer-structured-clone
    expect(JSON.parse(JSON.stringify(result))).toStrictEqual({
      totales: {
        trasladoIva16Base: '63.22',
        trasladoIva16Importe: '10.11',
        trasladoIva00Base: '0.12',
        trasladoIva00Importe: '0',
        total: '89.47',
      },
      pagos: [
        {
          monto: '5',
          montoMinimo: '4.09',
          tipoCambioP: '17.8945',
          impuestos: {
            'T:Traslado|I:002|F:Tasa|C:0.160000': {
              tipo: 'Traslado',
              impuesto: '002',
              tipoFactor: 'Tasa',
              tasaCuota: '0.160000',
              base: '3.53268',
              importe: '0.565229',
            },
            'T:Traslado|I:002|F:Tasa|C:0.000000': {
              tipo: 'Traslado',
              impuesto: '002',
              tipoFactor: 'Tasa',
              tasaCuota: '0.000000',
              base: '0.006899',
              importe: '0',
            },
          },
        },
      ],
    });
  });

  test('invalid or non-finite numeric attribute values use the default value', () => {
    const pagos = nodeFromXmlString(fileContents('pagos20-calculator/calculator-invalid-numeric-values.xml'));

    const result = new Calculator().calculate(pagos);

    // TipoCambioP and EquivalenciaDR invalid are considered as 1, ImpPagado invalid as 0
    const firstPago = result.getPago(0);
    expect(firstPago.getTipoCambioP()).toStrictEqual(new Decimal(1));
    expect(firstPago.getMonto()).toStrictEqual(new Decimal('116'));
    const traslado = firstPago.getImpuestos().getTraslado('002', 'Tasa', '0.160000');
    expect(traslado.getBase()).toStrictEqual(new Decimal('100'));
    expect(traslado.getImporte()).toStrictEqual(new Decimal('16'));

    // Monto invalid is considered as 0, but the minimum amount is still calculated
    const secondPago = result.getPago(1);
    expect(secondPago.getMonto()).toStrictEqual(new Decimal(0));
    expect(secondPago.getMontoMinimo()).toStrictEqual(new Decimal('10'));

    expect(result.getTotales().getTotal()).toStrictEqual(new Decimal('116'));
  });

  test('missing TipoCambioP and EquivalenciaDR are considered as 1', () => {
    const pagos = nodeFromXmlString(fileContents('pagos20-calculator/calculator-missing-tipocambio-equivalencia.xml'));

    const result = new Calculator().calculate(pagos);
    expect(result.getTotales().getTotal()).toStrictEqual(new Decimal('116'));
    expect(result.getTotales().getTrasladoIva16Base()).toStrictEqual(new Decimal('100'));
    expect(result.getTotales().getTrasladoIva16Importe()).toStrictEqual(new Decimal('16'));
  });
});
