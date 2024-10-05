import { Mixin } from 'ts-mixer';
import CantidadTransporta from '#src/cartaporte_31/cantidad_transporta';
import DetalleMercancia from '#src/cartaporte_31/detalle_mercancia';
import DocumentacionAduanera from '#src/cartaporte_31/documentacion_aduanera';
import GuiasIdentificacion from '#src/cartaporte_31/guias_identificacion';
import AbstractElement from '#src/common/abstract_element';

export default class Mercancia extends Mixin(AbstractElement) {
  public getElementName(): string {
    return 'cartaporte31:Mercancia';
  }

  public getChildrenOrder(): string[] {
    return [
      'cartaporte31:DocumentacionAduanera',
      'cartaporte31:GuiasIdentificacion',
      'cartaporte31:CantidadTransporta',
      'cartaporte31:DetalleMercancia',
    ];
  }

  public addDocumentacionAduanera(attributes: Record<string, unknown> = {}): DocumentacionAduanera {
    const subject = new DocumentacionAduanera(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiDocumentacionAduanera(...elementAttributes: Record<string, unknown>[]): this {
    for (const attributes of elementAttributes) {
      this.addDocumentacionAduanera(attributes);
    }

    return this;
  }

  public addGuiasIdentificacion(attributes: Record<string, unknown> = {}): GuiasIdentificacion {
    const subject = new GuiasIdentificacion(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiGuiasIdentificacion(...elementAttributes: Record<string, unknown>[]): this {
    for (const attributes of elementAttributes) {
      this.addGuiasIdentificacion(attributes);
    }

    return this;
  }

  public addCantidadTransporta(attributes: Record<string, unknown> = {}): CantidadTransporta {
    const subject = new CantidadTransporta(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiCantidadTransporta(...elementAttributes: Record<string, unknown>[]): this {
    for (const attributes of elementAttributes) {
      this.addCantidadTransporta(attributes);
    }

    return this;
  }

  public getDetalleMercancia(): DetalleMercancia {
    return this.helperGetOrAdd(new DetalleMercancia());
  }

  public addDetalleMercancia(attributes: Record<string, unknown> = {}): DetalleMercancia {
    const subject = this.getDetalleMercancia();
    subject.addAttributes(attributes);

    return subject;
  }
}
