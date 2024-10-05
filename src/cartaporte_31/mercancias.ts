import { Mixin } from 'ts-mixer';
import Autotransporte from '#src/cartaporte_31/autotransporte';
import Mercancia from '#src/cartaporte_31/mercancia';
import TransporteAereo from '#src/cartaporte_31/transporte_aereo';
import TransporteFerroviario from '#src/cartaporte_31/transporte_ferroviario';
import TransporteMaritimo from '#src/cartaporte_31/transporte_maritimo';
import AbstractElement from '#src/common/abstract_element';

export default class Mercancias extends Mixin(AbstractElement) {
  public getElementName(): string {
    return 'cartaporte31:Mercancias';
  }

  public getChildrenOrder(): string[] {
    return [
      'cartaporte31:Mercancia',
      'cartaporte31:Autotransporte',
      'cartaporte31:TransporteMaritimo',
      'cartaporte31:TransporteAereo',
      'cartaporte31:TransporteFerroviario',
    ];
  }

  public addMercancia(attributes: Record<string, unknown> = {}): Mercancia {
    const subject = new Mercancia(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiMercancia(...elementAttributes: Record<string, unknown>[]): this {
    for (const attributes of elementAttributes) {
      this.addMercancia(attributes);
    }

    return this;
  }

  public getAutotransporte(): Autotransporte {
    return this.helperGetOrAdd(new Autotransporte());
  }

  public addAutotransporte(attributes: Record<string, unknown> = {}): Autotransporte {
    const subject = this.getAutotransporte();
    subject.addAttributes(attributes);

    return subject;
  }

  public getTransporteMaritimo(): TransporteMaritimo {
    return this.helperGetOrAdd(new TransporteMaritimo());
  }

  public addTransporteMaritimo(attributes: Record<string, unknown> = {}): TransporteMaritimo {
    const subject = this.getTransporteMaritimo();
    subject.addAttributes(attributes);

    return subject;
  }

  public getTransporteAereo(): TransporteAereo {
    return this.helperGetOrAdd(new TransporteAereo());
  }

  public addTransporteAereo(attributes: Record<string, unknown> = {}): TransporteAereo {
    const subject = this.getTransporteAereo();
    subject.addAttributes(attributes);

    return subject;
  }

  public getTransporteFerroviario(): TransporteFerroviario {
    return this.helperGetOrAdd(new TransporteFerroviario());
  }

  public addTransporteFerroviario(attributes: Record<string, unknown> = {}): TransporteFerroviario {
    const subject = this.getTransporteFerroviario();
    subject.addAttributes(attributes);

    return subject;
  }
}
