import type Pago from './pago';
import type Totales from './totales';

export interface PagosJson {
  totales: Totales;
  pagos: Pago[];
}

export default class Pagos {
  private readonly _totales: Totales;

  private readonly _pagos: Pago[];

  public constructor(totales: Totales, ...pagos: Pago[]) {
    this._totales = totales;
    this._pagos = pagos;
  }

  public getTotales(): Totales {
    return this._totales;
  }

  public getPagos(): Pago[] {
    return this._pagos;
  }

  public getPago(index: number): Pago {
    const pago = this._pagos.at(index);
    if (pago === undefined || index < 0) {
      throw new RangeError(`No existe el pago con índice ${index}`);
    }

    return pago;
  }

  public toJSON(): PagosJson {
    return {
      totales: this._totales,
      pagos: this._pagos,
    };
  }
}
