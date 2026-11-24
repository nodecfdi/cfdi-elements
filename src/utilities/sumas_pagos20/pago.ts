import type { Decimal } from '@nodecfdi/cfdi-core';
import type Impuestos from './impuestos';

export interface PagoJson {
  monto: Decimal;
  montoMinimo: Decimal;
  tipoCambioP: Decimal;
  impuestos: Impuestos;
}

export default class Pago {
  private readonly _monto: Decimal;

  private readonly _montoMinimo: Decimal;

  private readonly _tipoCambioP: Decimal;

  private readonly _impuestos: Impuestos;

  public constructor(
    monto: Decimal,
    montoMinimo: Decimal,
    tipoCambioP: Decimal,
    impuestos: Impuestos,
  ) {
    this._monto = monto;
    this._montoMinimo = montoMinimo;
    this._tipoCambioP = tipoCambioP;
    this._impuestos = impuestos;
  }

  public getMonto(): Decimal {
    return this._monto;
  }

  public getMontoMinimo(): Decimal {
    return this._montoMinimo;
  }

  public getTipoCambioP(): Decimal {
    return this._tipoCambioP;
  }

  public getImpuestos(): Impuestos {
    return this._impuestos;
  }

  public toJSON(): PagoJson {
    return {
      monto: this._monto,
      montoMinimo: this._montoMinimo,
      tipoCambioP: this._tipoCambioP,
      impuestos: this._impuestos,
    };
  }
}
