import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import type { AutotransporteAttributes } from './autotransporte';
import type { MercanciaAttributes } from './mercancia';
import type { TransporteAereoAttributes } from './transporte_aereo';
import type { TransporteFerroviarioAttributes } from './transporte_ferroviario';
import type { TransporteMaritimoAttributes } from './transporte_maritimo';
import { AbstractElement } from '../../common/abstract_element';
import { Autotransporte } from './autotransporte';
import { Mercancia } from './mercancia';
import { TransporteAereo } from './transporte_aereo';
import { TransporteFerroviario } from './transporte_ferroviario';
import { TransporteMaritimo } from './transporte_maritimo';

export type MercanciasAttributes
  = | 'PesoBrutoTotal'
    | 'UnidadPeso'
    | 'PesoNetoTotal'
    | 'NumTotalMercancias'
    | 'CargoPorTasacion'
    | 'LogisticaInversaRecoleccionDevolucion';

export class Mercancias extends AbstractElement<MercanciasAttributes> {
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

  public addMercancia(attributes: AttributesRecord<MercanciaAttributes> = {}): Mercancia {
    const subject = new Mercancia(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiMercancia(...elementAttributes: AttributesRecord<MercanciaAttributes>[]): this {
    for (const attributes of elementAttributes) {
      this.addMercancia(attributes);
    }

    return this;
  }

  public getAutotransporte(): Autotransporte {
    return this.helperGetOrAdd(new Autotransporte());
  }

  public addAutotransporte(attributes: AttributesRecord<AutotransporteAttributes> = {}): Autotransporte {
    const subject = this.getAutotransporte();
    subject.addAttributes(attributes);

    return subject;
  }

  public getTransporteMaritimo(): TransporteMaritimo {
    return this.helperGetOrAdd(new TransporteMaritimo());
  }

  public addTransporteMaritimo(attributes: AttributesRecord<TransporteMaritimoAttributes> = {}): TransporteMaritimo {
    const subject = this.getTransporteMaritimo();
    subject.addAttributes(attributes);

    return subject;
  }

  public getTransporteAereo(): TransporteAereo {
    return this.helperGetOrAdd(new TransporteAereo());
  }

  public addTransporteAereo(attributes: AttributesRecord<TransporteAereoAttributes> = {}): TransporteAereo {
    const subject = this.getTransporteAereo();
    subject.addAttributes(attributes);

    return subject;
  }

  public getTransporteFerroviario(): TransporteFerroviario {
    return this.helperGetOrAdd(new TransporteFerroviario());
  }

  public addTransporteFerroviario(attributes: AttributesRecord<TransporteFerroviarioAttributes> = {}): TransporteFerroviario {
    const subject = this.getTransporteFerroviario();
    subject.addAttributes(attributes);

    return subject;
  }
}
