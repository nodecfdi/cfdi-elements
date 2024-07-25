import type Impuestos from '#src/cfdi_40/impuestos';
import type Retencion from '#src/cfdi_40/retencion';
import type Traslado from '#src/cfdi_40/traslado';

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
