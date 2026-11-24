import type { Decimal } from '@nodecfdi/cfdi-core';
import type Impuestos from './impuestos';

/**
 * The amounts on this class are set in the payment currency
 */
export default class DoctoRelacionado {
  private readonly _impPagado: Decimal;

  private readonly _impuestos: Impuestos;

  public constructor(impPagado: Decimal, impuestos: Impuestos) {
    this._impPagado = impPagado;
    this._impuestos = impuestos;
  }

  public getImpPagado(): Decimal {
    return this._impPagado;
  }

  public getImpuestos(): Impuestos {
    return this._impuestos;
  }
}
