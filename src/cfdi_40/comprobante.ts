import type { AttributesRecord, XmlNodeInterface } from '@nodecfdi/cfdi-core/types';
import type { CfdiRelacionadosAttributes } from './cfdi_relacionados';
import type Concepto from './concepto';
import type { ConceptoAttributes } from './concepto';
import type { EmisorAttributes } from './emisor';
import type { ImpuestosAttributes } from './impuestos';
import type { InformacionGlobalAttributes } from './informacion_global';
import type { ReceptorAttributes } from './receptor';
import type Retencion from './retencion';
import type { RetencionAttributes } from './retencion';
import type Traslado from './traslado';
import type { TrasladoAttributes } from './traslado';
import AbstractElement from '../common/abstract_element';
import Addenda from './addenda';
import CfdiRelacionados from './cfdi_relacionados';
import Complemento from './complemento';
import Conceptos from './conceptos';
import Emisor from './emisor';
import Impuestos from './impuestos';
import InformacionGlobal from './informacion_global';
import Receptor from './receptor';

export type ComprobanteAttributes
  = | 'Version'
    | 'Serie'
    | 'Folio'
    | 'Fecha'
    | 'Sello'
    | 'FormaPago'
    | 'NoCertificado'
    | 'Certificado'
    | 'CondicionesDePago'
    | 'SubTotal'
    | 'Descuento'
    | 'Moneda'
    | 'TipoCambio'
    | 'Total'
    | 'TipoDeComprobante'
    | 'Exportacion'
    | 'MetodoPago'
    | 'LugarExpedicion'
    | 'Confirmacion';

export default class Comprobante extends AbstractElement<ComprobanteAttributes> {
  public getElementName(): string {
    return 'cfdi:Comprobante';
  }

  public getChildrenOrder(): string[] {
    return [
      'cfdi:InformacionGlobal',
      'cfdi:CfdiRelacionados',
      'cfdi:Emisor',
      'cfdi:Receptor',
      'cfdi:Conceptos',
      'cfdi:Impuestos',
      'cfdi:Complemento',
      'cfdi:Addenda',
    ];
  }

  public getFixedAttributes(): Record<string, string> {
    return {
      'xmlns:cfdi': 'https://www.sat.gob.mx/cfd/4',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xsi:schemaLocation':
          'https://www.sat.gob.mx/cfd/4 https://www.sat.gob.mx/sitio_internet/cfd/4/cfdv40.xsd',
      'Version': '4.0',
    };
  }

  public getInformacionGlobal(): InformacionGlobal {
    return this.helperGetOrAdd(new InformacionGlobal());
  }

  public addInformacionGlobal(attributes: AttributesRecord<InformacionGlobalAttributes> = {}): InformacionGlobal {
    const subject = this.getInformacionGlobal();
    subject.addAttributes(attributes);

    return subject;
  }

  public addCfdiRelacionados(attributes: AttributesRecord<CfdiRelacionadosAttributes> = {}): CfdiRelacionados {
    const subject = new CfdiRelacionados(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiCfdiRelacionados(...elementAttributes: AttributesRecord<CfdiRelacionadosAttributes>[]): this {
    for (const attributes of elementAttributes) {
      this.addCfdiRelacionados(attributes);
    }

    return this;
  }

  public getEmisor(): Emisor {
    return this.helperGetOrAdd(new Emisor());
  }

  public addEmisor(attributes: AttributesRecord<EmisorAttributes> = {}): Emisor {
    const subject = this.getEmisor();
    subject.addAttributes(attributes);

    return subject;
  }

  public getReceptor(): Receptor {
    return this.helperGetOrAdd(new Receptor());
  }

  public addReceptor(attributes: AttributesRecord<ReceptorAttributes> = {}): Receptor {
    const subject = this.getReceptor();
    subject.addAttributes(attributes);

    return subject;
  }

  public getConceptos(): Conceptos {
    return this.helperGetOrAdd(new Conceptos());
  }

  public addConceptos(attributes: AttributesRecord = {}): Conceptos {
    const subject = this.getConceptos();
    subject.addAttributes(attributes);

    return subject;
  }

  public getImpuestos(): Impuestos {
    return this.helperGetOrAdd(new Impuestos());
  }

  public addImpuestos(attributes: AttributesRecord<ImpuestosAttributes> = {}): Impuestos {
    const subject = this.getImpuestos();
    subject.addAttributes(attributes);

    return subject;
  }

  public getComplemento(): Complemento {
    return this.helperGetOrAdd(new Complemento());
  }

  public addComplemento(children: XmlNodeInterface): this {
    this.getComplemento().addChild(children);

    return this;
  }

  public getAddenda(): Addenda {
    return this.helperGetOrAdd(new Addenda());
  }

  public addAddenda(children: XmlNodeInterface): this {
    this.getAddenda().addChild(children);

    return this;
  }

  public addConcepto(attributes: AttributesRecord<ConceptoAttributes> = {}): Concepto {
    return this.getConceptos().addConcepto(attributes);
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
