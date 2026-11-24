import type { AttributesRecord, XmlNodeInterface } from '@nodecfdi/cfdi-core/types';
import type { ACuentaTercerosAttributes } from './a_cuenta_terceros';
import type { CuentaPredialAttributes } from './cuenta_predial';
import type { InformacionAduaneraAttributes } from './informacion_aduanera';
import type { ParteAttributes } from './parte';
import type { Retencion, RetencionAttributes } from './retencion';
import type { Traslado, TrasladoAttributes } from './traslado';
import AbstractElement from '../../common/abstract_element';
import { ACuentaTerceros } from './a_cuenta_terceros';
import { ComplementoConcepto } from './complemento_concepto';
import { ConceptoImpuestos } from './concepto_impuestos';
import { CuentaPredial } from './cuenta_predial';
import { InformacionAduanera } from './informacion_aduanera';
import { Parte } from './parte';

export type ConceptoAttributes
  = | 'ClaveProdServ'
    | 'NoIdentificacion'
    | 'Cantidad'
    | 'ClaveUnidad'
    | 'Unidad'
    | 'Descripcion'
    | 'ValorUnitario'
    | 'Importe'
    | 'Descuento'
    | 'ObjetoImp';

export class Concepto extends AbstractElement<ConceptoAttributes> {
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

  public addImpuestos(attributes: AttributesRecord = {}): ConceptoImpuestos {
    const subject = this.getImpuestos();
    subject.addAttributes(attributes);

    return subject;
  }

  public getACuentaTerceros(): ACuentaTerceros {
    return this.helperGetOrAdd(new ACuentaTerceros());
  }

  public addACuentaTerceros(attributes: AttributesRecord<ACuentaTercerosAttributes> = {}): ACuentaTerceros {
    const subject = this.getACuentaTerceros();
    subject.addAttributes(attributes);

    return subject;
  }

  public addInformacionAduanera(attributes: AttributesRecord<InformacionAduaneraAttributes> = {}): InformacionAduanera {
    const subject = new InformacionAduanera(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiInformacionAduanera(...elementAttributes: AttributesRecord<InformacionAduaneraAttributes>[]): this {
    for (const attributes of elementAttributes) {
      this.addInformacionAduanera(attributes);
    }

    return this;
  }

  public addCuentaPredial(attributes: AttributesRecord<CuentaPredialAttributes> = {}): CuentaPredial {
    const subject = new CuentaPredial(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiCuentaPredial(...elementAttributes: AttributesRecord<CuentaPredialAttributes>[]): this {
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

  public addParte(attributes: AttributesRecord<ParteAttributes> = {}): Parte {
    const subject = new Parte(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiParte(...elementAttributes: AttributesRecord<ParteAttributes>[]): this {
    for (const attributes of elementAttributes) {
      this.addParte(attributes);
    }

    return this;
  }

  public addTraslado(attributes: AttributesRecord<TrasladoAttributes> = {}): Traslado {
    return this.getImpuestos().getTraslados().addTraslado(attributes);
  }

  public multiTraslado(...elementAttributes: AttributesRecord<TrasladoAttributes>[]): this {
    this.getImpuestos().getTraslados().multiTraslado(...elementAttributes);

    return this;
  }

  public addRetencion(attributes: AttributesRecord<RetencionAttributes> = {}): Retencion {
    return this.getImpuestos().getRetenciones().addRetencion(attributes);
  }

  public multiRetencion(...elementAttributes: AttributesRecord<RetencionAttributes>[]): this {
    this.getImpuestos().getRetenciones().multiRetencion(...elementAttributes);

    return this;
  }
}
