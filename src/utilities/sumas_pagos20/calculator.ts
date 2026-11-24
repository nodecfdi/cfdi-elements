import type { XmlNodeInterface } from '@nodecfdi/cfdi-core/types';
import { Decimal } from '@nodecfdi/cfdi-core';
import Currencies from './currencies';
import DoctoRelacionado from './docto_relacionado';
import Impuesto from './impuesto';
import Impuestos from './impuestos';
import Pago from './pago';
import Pagos from './pagos';
import Totales from './totales';

export default class Calculator {
  private _paymentTaxesPrecision = 6;

  private _currencies: Currencies;

  /**
  Define when calculated taxes are rounded or truncated
   */
  private _taxesRounded = true;

  public constructor(paymentTaxesPrecision = 6, currencies?: Currencies) {
    this.setPaymentTaxesPrecision(paymentTaxesPrecision);
    this._currencies = currencies ?? new Currencies({ MXN: 2, USD: 2 });
  }

  public getPaymentTaxesPrecision(): number {
    return this._paymentTaxesPrecision;
  }

  public setPaymentTaxesPrecision(paymentTaxesPrecision: number): void {
    this._paymentTaxesPrecision = Math.min(6, Math.max(0, Math.trunc(paymentTaxesPrecision)));
  }

  public getCurrencies(): Currencies {
    return this._currencies;
  }

  public setCurrencies(currencies: Currencies): void {
    this._currencies = currencies;
  }

  public setTaxesRounded(): void {
    this._taxesRounded = true;
  }

  public setTaxesTruncated(): void {
    this._taxesRounded = false;
  }

  public areTaxesRounded(): boolean {
    return this._taxesRounded;
  }

  public areTaxesTruncated(): boolean {
    return !this._taxesRounded;
  }

  public calculate(nodePagos: XmlNodeInterface): Pagos {
    const pagos = nodePagos.searchNodes('pago20:Pago').map((nodePago) => this.buildPago(nodePago));

    return new Pagos(this.buildTotales(pagos), ...pagos);
  }

  private buildPago(nodePago: XmlNodeInterface): Pago {
    let sumMonto = new Decimal(0);
    let impuestos = new Impuestos();
    for (const nodeDoctoRelacionado of nodePago.searchNodes('pago20:DoctoRelacionado')) {
      const doctoRelacionado = this.buildDoctoRelacionado(nodeDoctoRelacionado);
      sumMonto = sumMonto.plus(doctoRelacionado.getImpPagado());
      impuestos = impuestos.aggregate(doctoRelacionado.getImpuestos());
    }

    const montoMinimo = sumMonto.toDecimalPlaces(
      this._currencies.get(nodePago.getAttribute('MonedaP')),
      Decimal.ROUND_DOWN,
    );
    const monto = nodePago.hasAttribute('Monto')
      ? this.toDecimal(nodePago.getAttribute('Monto'))
      : montoMinimo;

    impuestos = this._taxesRounded
      ? impuestos.round(this._paymentTaxesPrecision)
      : impuestos.truncate(this._paymentTaxesPrecision);

    const tipoCambioP = this.toDecimal(nodePago.getAttribute('TipoCambioP'), 1);

    return new Pago(monto, montoMinimo, tipoCambioP, impuestos);
  }

  private buildDoctoRelacionado(nodeDoctoRelacionado: XmlNodeInterface): DoctoRelacionado {
    const equivalenciaDr = this.toDecimal(nodeDoctoRelacionado.getAttribute('EquivalenciaDR'), 1);
    const impPagado = this.toDecimal(nodeDoctoRelacionado.getAttribute('ImpPagado')).dividedBy(
      equivalenciaDr,
    );

    const traslados = this.processImpuestosTraslados(
      equivalenciaDr,
      nodeDoctoRelacionado.searchNodes('pago20:ImpuestosDR', 'pago20:TrasladosDR', 'pago20:TrasladoDR'),
    );
    const retenciones = this.processImpuestosRetenciones(
      equivalenciaDr,
      nodeDoctoRelacionado.searchNodes('pago20:ImpuestosDR', 'pago20:RetencionesDR', 'pago20:RetencionDR'),
    );

    return new DoctoRelacionado(impPagado, new Impuestos(...traslados, ...retenciones));
  }

  private processImpuestosTraslados(
    equivalenciaDr: Decimal,
    nodeImpuestos: XmlNodeInterface[],
  ): Impuesto[] {
    return nodeImpuestos.map((nodeImpuesto) =>
      new Impuesto(
        'Traslado',
        nodeImpuesto.getAttribute('ImpuestoDR'),
        nodeImpuesto.getAttribute('TipoFactorDR'),
        nodeImpuesto.getAttribute('TasaOCuotaDR'),
        this.toDecimal(nodeImpuesto.getAttribute('BaseDR')),
        this.toDecimal(nodeImpuesto.getAttribute('ImporteDR')),
      ).divide(equivalenciaDr));
  }

  private processImpuestosRetenciones(
    equivalenciaDr: Decimal,
    nodeImpuestos: XmlNodeInterface[],
  ): Impuesto[] {
    return nodeImpuestos.map((nodeImpuesto) =>
      new Impuesto(
        'Retencion',
        nodeImpuesto.getAttribute('ImpuestoDR'),
        '',
        '',
        new Decimal(0),
        this.toDecimal(nodeImpuesto.getAttribute('ImporteDR')),
      ).divide(equivalenciaDr));
  }

  private buildTotales(pagos: Pago[]): Totales {
    let total = new Decimal(0);
    let impuestos = new Impuestos();
    for (const pago of pagos) {
      const tipoCambioP = pago.getTipoCambioP();
      impuestos = impuestos.aggregate(pago.getImpuestos().multiply(tipoCambioP));
      total = total.plus(pago.getMonto().times(tipoCambioP));
    }

    impuestos = impuestos.round(2); // MXN

    const trasladoIva16 = impuestos.find('Traslado', '002', 'Tasa', '0.160000');
    const trasladoIva08 = impuestos.find('Traslado', '002', 'Tasa', '0.080000');
    const trasladoIva00 = impuestos.find('Traslado', '002', 'Tasa', '0.000000');

    return new Totales({
      retencionIva: impuestos.find('Retencion', '002')?.getImporte(),
      retencionIsr: impuestos.find('Retencion', '001')?.getImporte(),
      retencionIeps: impuestos.find('Retencion', '003')?.getImporte(),
      trasladoIva16Base: trasladoIva16?.getBase(),
      trasladoIva16Importe: trasladoIva16?.getImporte(),
      trasladoIva08Base: trasladoIva08?.getBase(),
      trasladoIva08Importe: trasladoIva08?.getImporte(),
      trasladoIva00Base: trasladoIva00?.getBase(),
      trasladoIva00Importe: trasladoIva00?.getImporte(),
      trasladoIvaExento: impuestos.find('Traslado', '002', 'Exento')?.getBase(),
      total: total.toDecimalPlaces(2, Decimal.ROUND_HALF_UP), // MXN
    });
  }

  private toDecimal(value: string, defaultValue = 0): Decimal {
    const trimmed = value.trim();
    if (trimmed === '') {
      return new Decimal(defaultValue);
    }

    try {
      const parsed = new Decimal(trimmed);

      return parsed.isFinite() ? parsed : new Decimal(defaultValue);
    } catch {
      return new Decimal(defaultValue);
    }
  }
}
