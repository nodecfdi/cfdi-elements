import type { Decimal } from '@nodecfdi/cfdi-core';

export interface TotalesValues {
  retencionIva?: Decimal;
  retencionIsr?: Decimal;
  retencionIeps?: Decimal;
  trasladoIva16Base?: Decimal;
  trasladoIva16Importe?: Decimal;
  trasladoIva08Base?: Decimal;
  trasladoIva08Importe?: Decimal;
  trasladoIva00Base?: Decimal;
  trasladoIva00Importe?: Decimal;
  trasladoIvaExento?: Decimal;
  total: Decimal;
}

export default class Totales {
  private readonly _values: TotalesValues;

  public constructor(values: TotalesValues) {
    this._values = { ...values };
  }

  public getRetencionIva(): Decimal | undefined {
    return this._values.retencionIva;
  }

  public getRetencionIsr(): Decimal | undefined {
    return this._values.retencionIsr;
  }

  public getRetencionIeps(): Decimal | undefined {
    return this._values.retencionIeps;
  }

  public getTrasladoIva16Base(): Decimal | undefined {
    return this._values.trasladoIva16Base;
  }

  public getTrasladoIva16Importe(): Decimal | undefined {
    return this._values.trasladoIva16Importe;
  }

  public getTrasladoIva08Base(): Decimal | undefined {
    return this._values.trasladoIva08Base;
  }

  public getTrasladoIva08Importe(): Decimal | undefined {
    return this._values.trasladoIva08Importe;
  }

  public getTrasladoIva00Base(): Decimal | undefined {
    return this._values.trasladoIva00Base;
  }

  public getTrasladoIva00Importe(): Decimal | undefined {
    return this._values.trasladoIva00Importe;
  }

  public getTrasladoIvaExento(): Decimal | undefined {
    return this._values.trasladoIvaExento;
  }

  public getTotal(): Decimal {
    return this._values.total;
  }

  public toJSON(): Partial<TotalesValues> {
    return Object.fromEntries(
      Object.entries(this._values).filter(([, value]) => value !== undefined),
    );
  }
}
