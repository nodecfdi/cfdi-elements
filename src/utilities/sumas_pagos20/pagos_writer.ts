import type { Decimal } from '@nodecfdi/cfdi-core';
import type { XmlNodeInterface } from '@nodecfdi/cfdi-core/types';
import type { Pago as PagoData } from './pago';
import type { Pagos as PagosData } from './pagos';
import { formatNumber } from '@nodecfdi/cfdi-core';
import { Pago as ElementPago } from '../../elements/pago_20/pago';
import { Pagos as ElementPagos } from '../../elements/pago_20/pagos';
import { Calculator } from './calculator';

export class PagosWriter {
  private readonly _pagos: ElementPagos;

  private readonly _calculator: Calculator;

  /**
   * @param pagos - The pago20:Pagos element to write into
   * @param calculator - Calculator used to obtain the result, required to know
   * the decimals for the payment taxes and the payment currencies
   */
  public constructor(pagos: XmlNodeInterface, calculator?: Calculator) {
    if (!(pagos instanceof ElementPagos)) {
      throw new TypeError('The argument pagos must be a Pagos (pago20:Pagos) element');
    }

    this._pagos = pagos;
    this._calculator = calculator ?? new Calculator();
  }

  public getPagos(): ElementPagos {
    return this._pagos;
  }

  public getCalculator(): Calculator {
    return this._calculator;
  }

  public put(result: PagosData): void {
    this.writeTotales(result);
    this.writePagos(result);
  }

  public writePago(pagoElement: ElementPago, pagoData: PagoData): void {
    if (!pagoElement.hasAttribute('Monto')) {
      pagoElement.setAttribute(
        'Monto',
        formatNumber(
          pagoData.getMontoMinimo(),
          this._calculator.getCurrencies().get(pagoElement.getAttribute('MonedaP')),
        ),
      );
    }

    this.removeNodeIfExists(pagoElement, 'pago20:ImpuestosP');

    this.writeRetenciones(pagoElement, pagoData);
    this.writeTraslados(pagoElement, pagoData);
  }

  public static calculateAndPut(complementoPagos: XmlNodeInterface): PagosData {
    const calculator = new Calculator();
    const result = calculator.calculate(complementoPagos);

    const writer = new PagosWriter(complementoPagos, calculator);
    writer.put(result);

    return result;
  }

  private writeRetenciones(pagoElement: ElementPago, pagoData: PagoData): void {
    const retenciones = pagoData.getImpuestos().getRetenciones();
    if (retenciones.length === 0) {
      return;
    }

    const precision = this._calculator.getPaymentTaxesPrecision();
    const retencionesElement = pagoElement.getImpuestosP().getRetencionesP();
    retencionesElement.clear();
    for (const retencion of retenciones) {
      retencionesElement.addRetencionP({
        ImpuestoP: retencion.getImpuesto(),
        ImporteP: formatNumber(retencion.getImporte(), precision),
      });
    }
  }

  private writeTraslados(pagoElement: ElementPago, pagoData: PagoData): void {
    const traslados = pagoData.getImpuestos().getTraslados();
    if (traslados.length === 0) {
      return;
    }

    const precision = this._calculator.getPaymentTaxesPrecision();
    const trasladosElement = pagoElement.getImpuestosP().getTrasladosP();
    trasladosElement.clear();
    for (const traslado of traslados) {
      const isExento = traslado.getTipoFactor() === 'Exento';
      trasladosElement.addTrasladoP({
        BaseP: formatNumber(traslado.getBase(), precision),
        ImpuestoP: traslado.getImpuesto(),
        TipoFactorP: traslado.getTipoFactor(),
        TasaOCuotaP: isExento ? undefined : traslado.getTasaCuota(),
        ImporteP: isExento ? undefined : formatNumber(traslado.getImporte(), precision),
      });
    }
  }

  private writeTotales(result: PagosData): void {
    this.removeNodeIfExists(this._pagos, 'pago20:Totales');
    const totales = result.getTotales();
    const format = (value: Decimal | undefined): string | undefined =>
      value === undefined ? undefined : formatNumber(value, 2);

    this._pagos.addTotales({
      MontoTotalPagos: format(totales.getTotal()),
      TotalRetencionesIVA: format(totales.getRetencionIva()),
      TotalRetencionesISR: format(totales.getRetencionIsr()),
      TotalRetencionesIEPS: format(totales.getRetencionIeps()),
      TotalTrasladosBaseIVA16: format(totales.getTrasladoIva16Base()),
      TotalTrasladosImpuestoIVA16: format(totales.getTrasladoIva16Importe()),
      TotalTrasladosBaseIVA8: format(totales.getTrasladoIva08Base()),
      TotalTrasladosImpuestoIVA8: format(totales.getTrasladoIva08Importe()),
      TotalTrasladosBaseIVA0: format(totales.getTrasladoIva00Base()),
      TotalTrasladosImpuestoIVA0: format(totales.getTrasladoIva00Importe()),
      TotalTrasladosBaseIVAExento: format(totales.getTrasladoIvaExento()),
    });
  }

  private writePagos(result: PagosData): void {
    const pagoElements = this._pagos.searchNodes('pago20:Pago');
    for (const [index, pagoElement] of pagoElements.entries()) {
      if (!(pagoElement instanceof ElementPago)) {
        throw new TypeError(
          `Cannot work with a pago20:Pago of class ${pagoElement.constructor.name}`,
        );
      }

      this.writePago(pagoElement, result.getPago(index));
    }
  }

  private removeNodeIfExists(node: XmlNodeInterface, ...searchPath: string[]): void {
    const elements = node.searchNodes(...searchPath);
    for (const element of elements) {
      node.children().delete(element);
    }
  }
}
