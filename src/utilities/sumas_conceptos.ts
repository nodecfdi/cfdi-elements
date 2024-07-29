import { roundNumber, toFloat } from '@nodecfdi/cfdi-core';
import { type XmlNodeInterface } from '@nodecfdi/cfdi-core/types';
import {
  type SumaExentos,
  type SumaLocal,
  type SumaRetenciones,
  type SumaTraslados,
} from '#src/types';

export default class SumasConceptos {
  private _importes = 0;

  private _descuento = 0;

  private declare _total: number;

  private declare _impuestosTrasladados: number;

  private declare _impuestosRetenidos: number;

  private _traslados: SumaTraslados = {};

  private _exentos: SumaExentos = {};

  private _retenciones: SumaRetenciones = {};

  private declare _localesImpuestosTrasladados: number;

  private declare _localesImpuestosRetenidos: number;

  private _localesTrasladados: SumaLocal[] = [];

  private _localesRetenciones: SumaLocal[] = [];

  private _precision: number;

  private _foundAnyConceptWithDiscount = false;

  public constructor(comprobante: XmlNodeInterface, precision = 2) {
    this._precision = Math.trunc(precision);
    this.addComprobante(comprobante);
  }

  public getTotal(): number {
    return this._total;
  }

  public getSubTotal(): number {
    return this._importes;
  }

  public getDescuento(): number {
    return this._descuento;
  }

  public getTraslados(): SumaTraslados {
    return this._traslados;
  }

  public getExentos(): SumaExentos {
    return this._exentos;
  }

  public getRetenciones(): SumaRetenciones {
    return this._retenciones;
  }

  public hasTraslados(): boolean {
    return Object.keys(this._traslados).length > 0;
  }

  public hasExentos(): boolean {
    return Object.keys(this._exentos).length > 0;
  }

  public hasRetenciones(): boolean {
    return Object.keys(this._retenciones).length > 0;
  }

  public getImpuestosTrasladados(): number {
    return this._impuestosTrasladados;
  }

  public getImpuestosRetenidos(): number {
    return this._impuestosRetenidos;
  }

  public getLocalesTraslados(): SumaLocal[] {
    return this._localesTrasladados;
  }

  public getLocalesRetenciones(): SumaLocal[] {
    return this._localesRetenciones;
  }

  public hasLocalesTraslados(): boolean {
    return this._localesTrasladados.length > 0;
  }

  public hasLocalesRetenciones(): boolean {
    return this._localesRetenciones.length > 0;
  }

  public getLocalesImpuestosTrasladados(): number {
    return this._localesImpuestosTrasladados;
  }

  public getLocalesImpuestosRetenidos(): number {
    return this._localesImpuestosRetenidos;
  }

  public getPrecision(): number {
    return this._precision;
  }

  public foundAnyConceptWithDiscount(): boolean {
    return this._foundAnyConceptWithDiscount;
  }

  private addComprobante(comprobante: XmlNodeInterface): void {
    const conceptos = comprobante.searchNodes('cfdi:Conceptos', 'cfdi:Concepto');
    for (const concepto of conceptos) {
      this.addConcepto(concepto);
    }

    this._localesTrasladados = this.populateImpuestosLocales(
      comprobante,
      'TrasladosLocales',
      'Traslado',
    );
    this._localesImpuestosTrasladados = this._localesTrasladados.reduce(
      (a: number, b) => a + b.Importe,
      0,
    );
    this._localesRetenciones = this.populateImpuestosLocales(
      comprobante,
      'RetencionesLocales',
      'Retenido',
    );
    this._localesImpuestosRetenidos = this._localesRetenciones.reduce(
      (a: number, b) => a + b.Importe,
      0,
    );

    this._traslados = this.roundImpuestosGroup(this._traslados);
    this._retenciones = this.roundImpuestosGroup(this._retenciones);
    this._impuestosTrasladados = Object.values(this._traslados).reduce(
      (a: number, b) => a + b.Importe,
      0,
    );
    this._impuestosRetenidos = Object.values(this._retenciones).reduce(
      (a: number, b) => a + b.Importe,
      0,
    );

    this._impuestosTrasladados = roundNumber(this._impuestosTrasladados, this._precision);
    this._impuestosRetenidos = roundNumber(this._impuestosRetenidos, this._precision);
    this._importes = roundNumber(this._importes, this._precision);
    this._descuento = roundNumber(this._descuento, this._precision);

    this._total = roundNumber(
      [
        this._importes,
        -this._descuento,
        this._impuestosTrasladados,
        -this._impuestosRetenidos,
        this._localesImpuestosTrasladados,
        -this._localesImpuestosRetenidos,
      ].reduce((a, b) => a + b, 0),
      this._precision,
    );
  }

  private addConcepto(concepto: XmlNodeInterface) {
    this._importes += toFloat(concepto.getAttribute('Importe'));
    if (concepto.hasAttribute('Descuento')) {
      this._foundAnyConceptWithDiscount = true;
    }

    this._descuento += toFloat(concepto.getAttribute('Descuento'));

    const traslados = concepto.searchNodes('cfdi:Impuestos', 'cfdi:Traslados', 'cfdi:Traslado');
    for (const traslado of traslados) {
      if (traslado.getAttribute('TipoFactor') === 'Exento') {
        this.addExento(traslado);
      } else {
        this.addTraslado(traslado);
      }
    }

    const retenciones = concepto.searchNodes(
      'cfdi:Impuestos',
      'cfdi:Retenciones',
      'cfdi:Retencion',
    );
    for (const retencion of retenciones) {
      this.addRetencion(retencion);
    }
  }

  private populateImpuestosLocales(
    comprobante: XmlNodeInterface,
    plural: string,
    singular: string,
  ): SumaLocal[] {
    const locales = comprobante.searchNodes(
      'cfdi:Complemento',
      'implocal:ImpuestosLocales',
      `implocal:${plural}`,
    );

    return locales.map((local) => {
      return {
        Impuesto: local.getAttribute(`ImpLoc${singular}`),
        Tasa: toFloat(local.getAttribute(`Tasade${singular}`)),
        Importe: toFloat(local.getAttribute('Importe')),
      };
    });
  }

  private roundImpuestosGroup<
    T extends Record<string, { Impuesto: string; Importe: number; Base?: number }>,
  >(group: T): T {
    for (const key of Object.keys(group)) {
      group[key].Importe = roundNumber(group[key].Importe, this._precision);
      if (group[key].Base !== undefined) {
        group[key].Base = roundNumber(group[key].Base, this._precision);
      }
    }

    return group;
  }

  private addTraslado(traslado: XmlNodeInterface): void {
    const key = this.impuestoKey(
      traslado.getAttribute('Impuesto'),
      traslado.getAttribute('TipoFactor'),
      traslado.getAttribute('TasaOCuota'),
    );

    if (!(key in this._traslados)) {
      this._traslados[key] = {
        Impuesto: traslado.getAttribute('Impuesto'),
        TipoFactor: traslado.getAttribute('TipoFactor'),
        TasaOCuota: traslado.getAttribute('TasaOCuota'),
        Importe: 0,
        Base: 0,
      };
    }

    this._traslados[key].Importe += toFloat(traslado.getAttribute('Importe'));
    this._traslados[key].Base += toFloat(traslado.getAttribute('Base'));
  }

  private addExento(exento: XmlNodeInterface): void {
    const key = this.impuestoKey(
      exento.getAttribute('Impuesto'),
      exento.getAttribute('TipoFactor'),
    );
    if (!(key in this._exentos)) {
      this._exentos[key] = {
        TipoFactor: exento.getAttribute('TipoFactor'),
        Impuesto: exento.getAttribute('Impuesto'),
        Base: 0,
      };
    }

    this._exentos[key].Base += toFloat(exento.getAttribute('Base'));
  }

  private addRetencion(retencion: XmlNodeInterface): void {
    const key = this.impuestoKey(retencion.getAttribute('Impuesto'));
    if (!(key in this._retenciones)) {
      this._retenciones[key] = {
        Impuesto: retencion.getAttribute('Impuesto'),
        Importe: 0,
      };
    }

    this._retenciones[key].Importe += toFloat(retencion.getAttribute('Importe'));
  }

  public impuestoKey(impuesto: string, tipoFactor = '', tasaOCuota = ''): string {
    return [impuesto, tipoFactor, tasaOCuota].join(':');
  }
}
