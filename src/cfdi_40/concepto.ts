import type { XmlNodeInterface } from '@nodecfdi/cfdi-core/types';
import type Retencion from './retencion';
import type Traslado from './traslado';
import AbstractElement from '../common/abstract_element';
import ACuentaTerceros from './a_cuenta_terceros';
import ComplementoConcepto from './complemento_concepto';
import ConceptoImpuestos from './concepto_impuestos';
import CuentaPredial from './cuenta_predial';
import InformacionAduanera from './informacion_aduanera';
import Parte from './parte';

export default class Concepto extends AbstractElement {
  public getElementName(): string {
    return 'cfdi:Concepto';
  }

  public getChildrenOrder(): string[] {
    return [
      'cfdi:Impuestos',
      'cfdi:ACuentaTerceros',
      'cfdi:InformacionAduanera',
      'cfdi:CuentaPredial',
      'cfdi:ComplementoConcepto',
      'cfdi:Parte',
    ];
  }

  public getImpuestos(): ConceptoImpuestos {
    return this.helperGetOrAdd(new ConceptoImpuestos());
  }

  public addImpuestos(attributes: Record<string, unknown> = {}): ConceptoImpuestos {
    const subject = this.getImpuestos();
    subject.addAttributes(attributes);

    return subject;
  }

  public getACuentaTerceros(): ACuentaTerceros {
    return this.helperGetOrAdd(new ACuentaTerceros());
  }

  public addACuentaTerceros(attributes: Record<string, unknown> = {}): ACuentaTerceros {
    const subject = this.getACuentaTerceros();
    subject.addAttributes(attributes);

    return subject;
  }

  public addInformacionAduanera(attributes: Record<string, unknown> = {}): InformacionAduanera {
    const subject = new InformacionAduanera(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiInformacionAduanera(...elementAttributes: Record<string, unknown>[]): this {
    for (const attributes of elementAttributes) {
      this.addInformacionAduanera(attributes);
    }

    return this;
  }

  public addCuentaPredial(attributes: Record<string, unknown> = {}): CuentaPredial {
    const subject = new CuentaPredial(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiCuentaPredial(...elementAttributes: Record<string, unknown>[]): this {
    for (const attributes of elementAttributes) {
      this.addCuentaPredial(attributes);
    }

    return this;
  }

  public getComplementoConcepto(): ComplementoConcepto {
    return this.helperGetOrAdd(new ComplementoConcepto());
  }

  public addComplementoConcepto(children: XmlNodeInterface): this {
    this.getComplementoConcepto().addChild(children);

    return this;
  }

  public addParte(attributes: Record<string, unknown> = {}): Parte {
    const subject = new Parte(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiParte(...elementAttributes: Record<string, unknown>[]): this {
    for (const attributes of elementAttributes) {
      this.addParte(attributes);
    }

    return this;
  }

  public addTraslado(attributes: Record<string, unknown> = {}): Traslado {
    return this.getImpuestos().getTraslados().addTraslado(attributes);
  }

  public multiTraslado(...elementAttributes: Record<string, unknown>[]): this {
    this.getImpuestos().getTraslados().multiTraslado(...elementAttributes);

    return this;
  }

  public addRetencion(attributes: Record<string, unknown> = {}): Retencion {
    return this.getImpuestos().getRetenciones().addRetencion(attributes);
  }

  public multiRetencion(...elementAttributes: Record<string, unknown>[]): this {
    this.getImpuestos().getRetenciones().multiRetencion(...elementAttributes);

    return this;
  }
}
