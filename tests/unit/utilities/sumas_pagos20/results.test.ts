import { Decimal } from '@nodecfdi/cfdi-core';
import { describe, expect, test } from 'vitest';
import { Currencies } from '../../../../src/utilities/sumas_pagos20/currencies';
import { Impuesto } from '../../../../src/utilities/sumas_pagos20/impuesto';
import { Impuestos } from '../../../../src/utilities/sumas_pagos20/impuestos';
import { Pago } from '../../../../src/utilities/sumas_pagos20/pago';
import { Pagos } from '../../../../src/utilities/sumas_pagos20/pagos';
import { Totales } from '../../../../src/utilities/sumas_pagos20/totales';

describe('sumas pagos20 results', () => {
  test('currencies returns configured decimals bounded between 0 and 4', () => {
    const currencies = new Currencies({ MXN: 2, BTC: 8, XXX: -1, JPY: 0.9 });
    expect(currencies.get('MXN')).toBe(2);
    expect(currencies.get('BTC')).toBe(4);
    expect(currencies.get('XXX')).toBe(0);
    expect(currencies.get('JPY')).toBe(0);
  });

  test('currencies returns 2 decimals for an unknown currency', () => {
    const currencies = new Currencies({ MXN: 2 });
    expect(currencies.get('USD')).toBe(2);
    expect(currencies.get('')).toBe(2);
  });

  test('impuesto build key', () => {
    expect(Impuesto.buildKey('Retencion', '001')).toBe('T:Retencion|I:001');
    expect(Impuesto.buildKey('Retencion', '001', 'Tasa', '0.100000')).toBe('T:Retencion|I:001');
    expect(Impuesto.buildKey('Traslado', '002')).toBe('T:Traslado|I:002|F:|C:');
    expect(Impuesto.buildKey('Traslado', '002', 'Tasa', '0.160000')).toBe('T:Traslado|I:002|F:Tasa|C:0.160000');
  });

  test('impuestos find and get', () => {
    const traslado = new Impuesto('Traslado', '002', 'Tasa', '0.160000', new Decimal(100), new Decimal(16));
    const retencion = new Impuesto('Retencion', '001', '', '', new Decimal(0), new Decimal(10));
    const impuestos = new Impuestos(traslado, retencion);

    expect(impuestos.get('Traslado', '002', 'Tasa', '0.160000')).toBe(traslado);
    expect(impuestos.get('Retencion', '001')).toBe(retencion);
    expect(impuestos.find('Traslado', '002', 'Tasa', '0.080000')).toBeUndefined();
  });

  test('impuestos get throws when the impuesto does not exist', () => {
    const impuestos = new Impuestos();
    expect(() => impuestos.get('Traslado', '002', 'Tasa', '0.160000')).toThrow(
      'No se pudo encontrar el Traslado impuesto "002", tipo factor "Tasa", tasa o cuota "0.160000"',
    );
    expect(() => impuestos.getRetencion('001')).toThrow(
      'No se pudo encontrar el Retencion impuesto "001", tipo factor "", tasa o cuota ""',
    );
  });

  test('pagos get pago by index', () => {
    const first = new Pago(new Decimal(1), new Decimal(1), new Decimal(1), new Impuestos());
    const second = new Pago(new Decimal(2), new Decimal(2), new Decimal(1), new Impuestos());
    const pagos = new Pagos(new Totales({ total: new Decimal(3) }), first, second);

    expect(pagos.getPagos()).toStrictEqual([first, second]);
    expect(pagos.getPago(0)).toBe(first);
    expect(pagos.getPago(1)).toBe(second);
  });

  test('pagos get pago throws on an index out of range', () => {
    const pago = new Pago(new Decimal(1), new Decimal(1), new Decimal(1), new Impuestos());
    const pagos = new Pagos(new Totales({ total: new Decimal(1) }), pago);

    expect(() => pagos.getPago(1)).toThrow(RangeError);
    expect(() => pagos.getPago(1)).toThrow('No existe el pago con índice 1');
    // negative index must not be resolved from the end as Array.prototype.at does
    expect(() => pagos.getPago(-1)).toThrow('No existe el pago con índice -1');
  });
});
