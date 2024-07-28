import { type XmlNodeInterface } from '@nodecfdi/cfdi-core/types';
import { Mixin } from 'ts-mixer';
import ACuentaTerceros from '#src/cfdi_40/a_cuenta_terceros';
import ComplementoConcepto from '#src/cfdi_40/complemento_concepto';
import CuentaPredial from '#src/cfdi_40/cuenta_predial';
import InformacionAduanera from '#src/cfdi_40/informacion_aduanera';
import WithImpuestos from '#src/cfdi_40/mixins/with_impuestos';
import Parte from '#src/cfdi_40/parte';
import AbstractElement from '#src/common/abstract_element';
import ConceptoImpuestos from './concepto_impuestos.js';

export default class Concepto extends Mixin(AbstractElement, WithImpuestos) {
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
}
