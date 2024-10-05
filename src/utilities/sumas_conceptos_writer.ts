import { formatNumber, roundNumber } from '@nodecfdi/cfdi-core';
import { type XmlNodeInterface } from '@nodecfdi/cfdi-core/types';
import Comprobante from '#src/cfdi_40/comprobante';
import type SumasConceptos from '#src/utilities/sumas_conceptos';

export default class SumasConceptosWriter {
  private readonly _comprobante: Comprobante;

  private readonly _sumas: SumasConceptos;

  private readonly _precision: number;

  private readonly _writeImpuestosBase: boolean;

  private readonly _writeExentos: boolean;

  public constructor(comprobante: XmlNodeInterface, sumas: SumasConceptos, precision = 6) {
    if (comprobante instanceof Comprobante) {
      this._writeImpuestosBase = true;
      this._writeExentos = true;
    } else {
      throw new TypeError(
        'The argument comprobante must be a Comprobante (CFDI 3.3 or CFDI 4.0) element',
      );
    }

    this._comprobante = comprobante;
    this._sumas = sumas;
    this._precision = Math.trunc(precision);
  }

  public put(): void {
    this.putComprobanteSumas();
    this.putImpuestosNode();
    this.putComplementoImpuestoLocalSumas();
  }

  public getComprobante(): Comprobante {
    return this._comprobante;
  }

  public getSumasConceptos(): SumasConceptos {
    return this._sumas;
  }

  public getPrecision(): number {
    return this._precision;
  }

  public hasWriteImpuestoBase(): boolean {
    return this._writeImpuestosBase;
  }

  public hasWriteExentos(): boolean {
    return this._writeExentos;
  }

  private putComprobanteSumas(): void {
    this._comprobante.setAttribute(
      'SubTotal',
      formatNumber(this._sumas.getSubTotal(), this._precision),
    );
    this._comprobante.setAttribute('Total', formatNumber(this._sumas.getTotal(), this._precision));
    this._comprobante.setAttribute(
      'Descuento',
      formatNumber(this._sumas.getDescuento(), this._precision),
    );
    if (
      !this._sumas.foundAnyConceptWithDiscount() &&
      !this.valueGreaterThanZero(this._sumas.getDescuento())
    ) {
      this._comprobante.attributes().delete('Descuento');
    }
  }

  private putImpuestosNode(): void {
    // Obtain node reference
    const impuestos = this._comprobante.getImpuestos();
    // If there is nothing to write then remove the children and exit
    if (
      !this._sumas.hasTraslados() &&
      !this._sumas.hasRetenciones() &&
      !(this._writeExentos && this._sumas.hasExentos())
    ) {
      this._comprobante.children().delete(impuestos);

      return;
    }

    // Clear previous values
    impuestos.clear();
    // Add traslados when needed
    if (this._sumas.hasTraslados()) {
      impuestos.setAttribute(
        'TotalImpuestosTrasladados',
        formatNumber(this._sumas.getImpuestosTrasladados(), this._precision),
      );
      impuestos
        .getTraslados()
        .multiTraslado(
          ...this.getImpuestosContents(this._sumas.getTraslados(), this._writeImpuestosBase, true),
        );
    }

    if (this._writeExentos && this._sumas.hasExentos()) {
      impuestos
        .getTraslados()
        .multiTraslado(
          ...this.getImpuestosContents(this._sumas.getExentos(), this._writeImpuestosBase, false),
        );
    }

    // Add retenciones when needed
    if (this._sumas.hasRetenciones()) {
      impuestos.setAttribute(
        'TotalImpuestosRetenidos',
        formatNumber(this._sumas.getImpuestosRetenidos(), this._precision),
      );
      impuestos
        .getRetenciones()
        .multiRetencion(...this.getImpuestosContents(this._sumas.getRetenciones(), false, true));
    }
  }

  private putComplementoImpuestoLocalSumas(): void {
    // Seach for implocal node
    const implocal = this._comprobante.searchNode('cfdi:Complemento', 'implocal:ImpuestosLocales');
    if (!implocal) {
      return;
    }

    if (!this._sumas.hasLocalesTraslados() && !this._sumas.hasLocalesRetenciones()) {
      const complemento = this._comprobante.getComplemento();
      complemento.children().delete(implocal);
      if (complemento.length === 0) {
        this._comprobante.children().delete(complemento);
      }

      return;
    }

    implocal.setAttribute(
      'TotaldeRetenciones',
      formatNumber(this._sumas.getLocalesImpuestosRetenidos(), this._precision),
    );
    implocal.setAttribute(
      'TotaldeTraslados',
      formatNumber(this._sumas.getLocalesImpuestosTrasladados(), this._precision),
    );
  }

  private getImpuestosContents(
    impuestos: Record<
      string,
      {
        Impuesto: string;
        TipoFactor?: string;
        TasaOCuota?: string;
        Importe?: number;
        Base?: number;
      }
    >,
    hasBase: boolean,
    hasImporte: boolean,
  ): Record<string, unknown>[] {
    const result: Record<string, unknown>[] = [];
    for (const impuesto of Object.values(impuestos)) {
      const resultImpuesto = Object.assign(impuesto, {
        Base: hasBase ? formatNumber(impuesto.Base ?? 0, this._precision) : undefined,
        Importe: hasImporte ? formatNumber(impuesto.Importe ?? 0, this._precision) : undefined,
      });

      result.push({
        ...resultImpuesto,
      });
    }

    return result;
  }

  private valueGreaterThanZero(value: number): boolean {
    return roundNumber(value, this._precision) > 0;
  }
}
