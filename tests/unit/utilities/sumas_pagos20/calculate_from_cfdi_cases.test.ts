import type { XmlNodeInterface } from '@nodecfdi/cfdi-core/types';
import { Decimal, nodeFromXmlString } from '@nodecfdi/cfdi-core';
import { describe, expect, test } from 'vitest';
import { Calculator } from '../../../../src/utilities/sumas_pagos20/calculator';
import { fileContents } from '../../../../test_helpers/test_utils';

const checkAttributeDecimal = (
  node: XmlNodeInterface,
  attribute: string,
  value: Decimal | undefined,
): void => {
  if (node.hasAttribute(attribute)) {
    expect(value?.equals(node.getAttribute(attribute)), `${node.name()}@${attribute}`).toBe(true);
  } else {
    expect(value, `Since attribute ${attribute} does not exists, then value must be undefined`).toBeUndefined();
  }
};

describe('sumas pagos20 calculate from cfdi cases', () => {
  test.each([
    ['created-cfdi40-pago20-valid.xml'],
    // 1 pago MXN pagando a 4 doctos MXN con tasa 16, 0 y exento. 1 pago USD pagando a 1 docto MXN con tasa 16.
    ['pagos20-calculator/001.xml'],
    // 1 Pago en MXN, con 1 documento relacionado MXN, ISR e IVA retenido, IVA 16% e IEPS 53% trasladado
    ['pagos20-calculator/002.xml'],
    // 2 Pago en MXN, con 1 documento relacionado MXN cada uno, IVA e ISR retenido, IVA 16% trasladado
    ['pagos20-calculator/003.xml'],
    // 1 Pago en MXN, 43 documentos relacionados en USD con IVA 16%, sensible a truncado o redondeo
    ['pagos20-calculator/004.xml'],
    // Únicamente CFDI que no son objetos de pago, sin impuestos
    ['pagos20-calculator/005.xml'],
    // 3 Pagos, cada uno con 1 documento relacionado, IVA16, IVA0 e IVA Exento, sensible a truncado o redondeo
    ['pagos20-calculator/006.xml'],
    // 1 Pago, 38 documentos relacionados con IVA0
    ['pagos20-calculator/007.xml'],
    // 1 Pago, el monto (168168.00) es mayor al mínimo (168167.99), IVA retenido y trasladado
    ['pagos20-calculator/008.xml'],
  ])('predefined cfdi %s', (file) => {
    const cfdi = nodeFromXmlString(fileContents(file));
    const nodePagos = cfdi.searchNode('cfdi:Complemento', 'pago20:Pagos');
    if (!nodePagos) {
      throw new Error(`File ${file} does not have a pago20:Pagos node`);
    }

    const pagos = new Calculator().calculate(nodePagos);

    // totales
    const nodeTotales = nodePagos.searchNode('pago20:Totales');
    if (!nodeTotales) {
      throw new Error(`File ${file} does not have a pago20:Totales node`);
    }

    const totales = pagos.getTotales();
    expect(totales.getTotal().toFixed(2)).toBe(nodeTotales.getAttribute('MontoTotalPagos'));
    checkAttributeDecimal(nodeTotales, 'TotalRetencionesIVA', totales.getRetencionIva());
    checkAttributeDecimal(nodeTotales, 'TotalRetencionesISR', totales.getRetencionIsr());
    checkAttributeDecimal(nodeTotales, 'TotalRetencionesIEPS', totales.getRetencionIeps());
    checkAttributeDecimal(nodeTotales, 'TotalTrasladosBaseIVA16', totales.getTrasladoIva16Base());
    checkAttributeDecimal(nodeTotales, 'TotalTrasladosImpuestoIVA16', totales.getTrasladoIva16Importe());
    checkAttributeDecimal(nodeTotales, 'TotalTrasladosBaseIVA8', totales.getTrasladoIva08Base());
    checkAttributeDecimal(nodeTotales, 'TotalTrasladosImpuestoIVA8', totales.getTrasladoIva08Importe());
    checkAttributeDecimal(nodeTotales, 'TotalTrasladosBaseIVA0', totales.getTrasladoIva00Base());
    checkAttributeDecimal(nodeTotales, 'TotalTrasladosImpuestoIVA0', totales.getTrasladoIva00Importe());
    checkAttributeDecimal(nodeTotales, 'TotalTrasladosBaseIVAExento', totales.getTrasladoIvaExento());

    // pago@monto, pago/impuestos
    const nodePagoList = nodePagos.searchNodes('pago20:Pago');
    expect(pagos.getPagos()).toHaveLength(nodePagoList.length);
    for (const [index, nodePago] of nodePagoList.entries()) {
      const pago = pagos.getPago(index);
      expect(pago.getMontoMinimo().lte(nodePago.getAttribute('Monto'))).toBe(true);

      const nodeRetenciones = nodePago.searchNodes('pago20:ImpuestosP', 'pago20:RetencionesP', 'pago20:RetencionP');
      for (const nodeRetencion of nodeRetenciones) {
        const retencion = pago.getImpuestos().getRetencion(nodeRetencion.getAttribute('ImpuestoP'));
        expect(retencion.getImporte()).toStrictEqual(new Decimal(nodeRetencion.getAttribute('ImporteP')));
      }

      const nodeTraslados = nodePago.searchNodes('pago20:ImpuestosP', 'pago20:TrasladosP', 'pago20:TrasladoP');
      for (const nodeTraslado of nodeTraslados) {
        const traslado = pago.getImpuestos().getTraslado(
          nodeTraslado.getAttribute('ImpuestoP'),
          nodeTraslado.getAttribute('TipoFactorP'),
          nodeTraslado.getAttribute('TasaOCuotaP'),
        );
        expect(traslado.getBase()).toStrictEqual(new Decimal(nodeTraslado.getAttribute('BaseP')));
        expect(traslado.getImporte()).toStrictEqual(new Decimal(nodeTraslado.getAttribute('ImporteP') || '0'));
      }
    }
  });
});
