import { Decimal } from '@nodecfdi/cfdi-core';

export type ImpuestoTipo = 'Traslado' | 'Retencion';

export interface ImpuestoJson {
  tipo: ImpuestoTipo;
  impuesto: string;
  tipoFactor: string;
  tasaCuota: string;
  base: Decimal;
  importe: Decimal;
}

export class Impuesto {
  private readonly _tipo: ImpuestoTipo;

  private readonly _impuesto: string;

  private readonly _tipoFactor: string;

  private readonly _tasaCuota: string;

  private readonly _base: Decimal;

  private readonly _importe: Decimal;

  public constructor(
    tipo: ImpuestoTipo,
    impuesto: string,
    tipoFactor: string,
    tasaCuota: string,
    base: Decimal,
    importe: Decimal,
  ) {
    this._tipo = tipo;
    this._impuesto = impuesto;
    this._tipoFactor = tipoFactor;
    this._tasaCuota = tasaCuota;
    this._base = base;
    this._importe = importe;
  }

  public getKey(): string {
    return Impuesto.buildKey(this._tipo, this._impuesto, this._tipoFactor, this._tasaCuota);
  }

  public getTipo(): ImpuestoTipo {
    return this._tipo;
  }

  public getImpuesto(): string {
    return this._impuesto;
  }

  public getTipoFactor(): string {
    return this._tipoFactor;
  }

  public getTasaCuota(): string {
    return this._tasaCuota;
  }

  public getBase(): Decimal {
    return this._base;
  }

  public getImporte(): Decimal {
    return this._importe;
  }

  public add(other: Impuesto): Impuesto {
    return this.withValues(this._base.plus(other._base), this._importe.plus(other._importe));
  }

  public truncate(decimals: number): Impuesto {
    return this.withValues(
      this._base.toDecimalPlaces(decimals, Decimal.ROUND_DOWN),
      this._importe.toDecimalPlaces(decimals, Decimal.ROUND_DOWN),
    );
  }

  public multiply(factor: Decimal): Impuesto {
    return this.withValues(this._base.times(factor), this._importe.times(factor));
  }

  public divide(factor: Decimal): Impuesto {
    return this.withValues(this._base.dividedBy(factor), this._importe.dividedBy(factor));
  }

  public round(decimals: number): Impuesto {
    return this.withValues(
      this._base.toDecimalPlaces(decimals, Decimal.ROUND_HALF_UP),
      this._importe.toDecimalPlaces(decimals, Decimal.ROUND_HALF_UP),
    );
  }

  public toJSON(): ImpuestoJson {
    return {
      tipo: this._tipo,
      impuesto: this._impuesto,
      tipoFactor: this._tipoFactor,
      tasaCuota: this._tasaCuota,
      base: this._base,
      importe: this._importe,
    };
  }

  public static buildKey(
    tipo: string,
    impuesto: string,
    tipoFactor = '',
    tasaCuota = '',
  ): string {
    if (tipo === 'Retencion') {
      return `T:${tipo}|I:${impuesto}`;
    }

    return `T:${tipo}|I:${impuesto}|F:${tipoFactor}|C:${tasaCuota}`;
  }

  private withValues(base: Decimal, importe: Decimal): Impuesto {
    return new Impuesto(this._tipo, this._impuesto, this._tipoFactor, this._tasaCuota, base, importe);
  }
}
