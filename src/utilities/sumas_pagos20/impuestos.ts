import type { Decimal } from '@nodecfdi/cfdi-core';
import type { ImpuestoTipo } from './impuesto';
import { Impuesto } from './impuesto';

export class Impuestos {
  private _impuestos = new Map<string, Impuesto>();

  public constructor(...impuestos: Impuesto[]) {
    for (const impuesto of impuestos) {
      const key = impuesto.getKey();
      const current = this._impuestos.get(key);
      this._impuestos.set(key, current ? current.add(impuesto) : impuesto);
    }
  }

  public find(
    tipo: ImpuestoTipo,
    impuesto: string,
    tipoFactor = '',
    tasaCuota = '',
  ): Impuesto | undefined {
    return this._impuestos.get(Impuesto.buildKey(tipo, impuesto, tipoFactor, tasaCuota));
  }

  public get(tipo: ImpuestoTipo, impuesto: string, tipoFactor = '', tasaCuota = ''): Impuesto {
    const found = this.find(tipo, impuesto, tipoFactor, tasaCuota);
    if (found === undefined) {
      throw new Error(
        `No se pudo encontrar el ${tipo} impuesto "${impuesto}", tipo factor "${tipoFactor}", tasa o cuota "${tasaCuota}"`,
      );
    }

    return found;
  }

  public getTraslados(): Impuesto[] {
    return this.filterByTipo('Traslado');
  }

  public getTraslado(impuesto: string, tipoFactor: string, tasaCuota: string): Impuesto {
    return this.get('Traslado', impuesto, tipoFactor, tasaCuota);
  }

  public getRetenciones(): Impuesto[] {
    return this.filterByTipo('Retencion');
  }

  public getRetencion(impuesto: string): Impuesto {
    return this.get('Retencion', impuesto);
  }

  public aggregate(other: Impuestos): Impuestos {
    const impuestos = new Map(this._impuestos);
    for (const [key, impuesto] of other._impuestos) {
      const current = impuestos.get(key);
      impuestos.set(key, current ? impuesto.add(current) : impuesto);
    }

    return Impuestos.withImpuestos(impuestos);
  }

  public truncate(decimals: number): Impuestos {
    return this.map((impuesto) => impuesto.truncate(decimals));
  }

  public multiply(value: Decimal): Impuestos {
    return this.map((impuesto) => impuesto.multiply(value));
  }

  public round(decimals: number): Impuestos {
    return this.map((impuesto) => impuesto.round(decimals));
  }

  public toJSON(): Record<string, Impuesto> {
    return Object.fromEntries(this._impuestos);
  }

  private static withImpuestos(impuestos: Map<string, Impuesto>): Impuestos {
    const object = new Impuestos();
    object._impuestos = impuestos;

    return object;
  }

  private map(callback: (impuesto: Impuesto) => Impuesto): Impuestos {
    const impuestos = new Map<string, Impuesto>();
    for (const [key, impuesto] of this._impuestos) {
      impuestos.set(key, callback(impuesto));
    }

    return Impuestos.withImpuestos(impuestos);
  }

  private filterByTipo(tipo: ImpuestoTipo): Impuesto[] {
    const filtered: Impuesto[] = [];
    for (const impuesto of this._impuestos.values()) {
      if (impuesto.getTipo() === tipo) {
        filtered.push(impuesto);
      }
    }

    return filtered;
  }
}
