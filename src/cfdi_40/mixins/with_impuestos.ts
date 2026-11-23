import type Impuestos from '../impuestos';
import type Retencion from '../retencion';
import type Traslado from '../traslado';

export default abstract class WithImpuestos {
  public abstract getImpuestos(): Impuestos;

  public addTraslado(attributes: Record<string, unknown> = {}): Traslado {
    return this.getImpuestos().getTraslados().addTraslado(attributes);
  }

  public multiTraslado(...elementAttributes: Record<string, unknown>[]): this {
    this.getImpuestos()
      .getTraslados()
      .multiTraslado(...elementAttributes);

    return this;
  }

  public addRetencion(attributes: Record<string, unknown> = {}): Retencion {
    return this.getImpuestos().getRetenciones().addRetencion(attributes);
  }

  public multiRetencion(...elementAttributes: Record<string, unknown>[]): this {
    this.getImpuestos()
      .getRetenciones()
      .multiRetencion(...elementAttributes);

    return this;
  }
}
