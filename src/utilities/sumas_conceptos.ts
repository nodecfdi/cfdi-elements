/* eslint-disable unicorn/no-computed-property-existence-check */
import type { XmlNodeInterface } from '@nodecfdi/cfdi-core/types';
import type { SumaExentos, SumaLocal, SumaRetenciones, SumaTraslados } from '../types';
import { Decimal } from '@nodecfdi/cfdi-core';

export class SumasConceptos {
  private _importes = new Decimal(0);

  private _descuento = new Decimal(0);

  private declare _total: Decimal;

  private declare _impuestosTrasladados: Decimal;

  private declare _impuestosRetenidos: Decimal;

  private _traslados: SumaTraslados = {};

  private _exentos: SumaExentos = {};

  private _retenciones: SumaRetenciones = {};

  private declare _localesImpuestosTrasladados: Decimal;

  private declare _localesImpuestosRetenidos: Decimal;

  private _localesTrasladados: SumaLocal[] = [];

  private _localesRetenciones: SumaLocal[] = [];

  private readonly _precision: number;

  private _foundAnyConceptWithDiscount = false;

  public constructor(comprobante: XmlNodeInterface, precision = 2) {
    this._precision = Math.trunc(precision);
    this.addComprobante(comprobante);
  }

  public getTotal(): Decimal {
    return this._total;
  }

  public getSubTotal(): Decimal {
    return this._importes;
  }

  public getDescuento(): Decimal {
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

  public getImpuestosTrasladados(): Decimal {
    return this._impuestosTrasladados;
  }

  public getImpuestosRetenidos(): Decimal {
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

  public getLocalesImpuestosTrasladados(): Decimal {
    return this._localesImpuestosTrasladados;
  }

  public getLocalesImpuestosRetenidos(): Decimal {
    return this._localesImpuestosRetenidos;
  }

  public getPrecision(): number {
    return this._precision;
  }

  public foundAnyConceptWithDiscount(): boolean {
    return this._foundAnyConceptWithDiscount;
  }

  public impuestoKey(impuesto: string, tipoFactor = '', tasaOCuota = ''): string {
    return [impuesto, tipoFactor, tasaOCuota].join(':');
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
    this._localesImpuestosTrasladados = this._localesTrasladados
      .reduce((a, b) => a.plus(b.Importe), new Decimal(0))
      .toDecimalPlaces(this._precision);
    this._localesRetenciones = this.populateImpuestosLocales(
      comprobante,
      'RetencionesLocales',
      'Retenido',
    );
    this._localesImpuestosRetenidos = this._localesRetenciones
      .reduce((a, b) => a.plus(b.Importe), new Decimal(0))
      .toDecimalPlaces(this._precision);

    this._traslados = this.roundImpuestosGroup(this._traslados);
    this._exentos = this.roundImpuestosGroup(this._exentos);
    this._retenciones = this.roundImpuestosGroup(this._retenciones);
    this._impuestosTrasladados = Object.values(this._traslados)
      .reduce((a, b) => a.plus(b.Importe), new Decimal(0))
      .toDecimalPlaces(this._precision);
    this._impuestosRetenidos = Object.values(this._retenciones)
      .reduce((a, b) => a.plus(b.Importe), new Decimal(0))
      .toDecimalPlaces(this._precision);

    this._importes = this._importes.toDecimalPlaces(this._precision);
    this._descuento = this._descuento.toDecimalPlaces(this._precision);

    this._total = this._importes
      .minus(this._descuento)
      .plus(this._impuestosTrasladados)
      .minus(this._impuestosRetenidos)
      .plus(this._localesImpuestosTrasladados)
      .minus(this._localesImpuestosRetenidos)
      .toDecimalPlaces(this._precision);
  }

  private addConcepto(concepto: XmlNodeInterface): void {
    this._importes = this._importes.plus(this.toDecimal(concepto.getAttribute('Importe')));
    if (concepto.hasAttribute('Descuento')) {
      this._foundAnyConceptWithDiscount = true;
    }

    this._descuento = this._descuento.plus(this.toDecimal(concepto.getAttribute('Descuento')));

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
        Tasa: this.toDecimal(local.getAttribute(`Tasade${singular}`)),
        Importe: this.toDecimal(local.getAttribute('Importe')),
      };
    });
  }

  private roundImpuestosGroup<
    T extends Record<string, { Impuesto: string; Importe?: Decimal; Base?: Decimal }>,
  >(
    group: T,
  ): T {
    // eslint-disable-next-line unicorn/prefer-object-iterable-methods
    for (const key of Object.keys(group)) {
      if (group[key].Importe !== undefined) {
        group[key].Importe = group[key].Importe.toDecimalPlaces(this._precision);
      }

      if (group[key].Base !== undefined) {
        group[key].Base = group[key].Base.toDecimalPlaces(this._precision);
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
        Importe: new Decimal(0),
        Base: new Decimal(0),
      };
    }

    this._traslados[key].Importe = this._traslados[key].Importe.plus(
      this.toDecimal(traslado.getAttribute('Importe')),
    );
    this._traslados[key].Base = this._traslados[key].Base.plus(
      this.toDecimal(traslado.getAttribute('Base')),
    );
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
        Base: new Decimal(0),
      };
    }

    this._exentos[key].Base = this._exentos[key].Base.plus(
      this.toDecimal(exento.getAttribute('Base')),
    );
  }

  private addRetencion(retencion: XmlNodeInterface): void {
    const key = this.impuestoKey(retencion.getAttribute('Impuesto'));
    if (!(key in this._retenciones)) {
      this._retenciones[key] = {
        Impuesto: retencion.getAttribute('Impuesto'),
        Importe: new Decimal(0),
      };
    }

    this._retenciones[key].Importe = this._retenciones[key].Importe.plus(
      this.toDecimal(retencion.getAttribute('Importe')),
    );
  }

  private toDecimal(value: string): Decimal {
    const trimmed = value.trim();
    if (trimmed === '') {
      return new Decimal(0);
    }

    try {
      const parsed = new Decimal(trimmed);

      return parsed.isFinite() ? parsed : new Decimal(0);
    } catch {
      return new Decimal(0);
    }
  }
}
