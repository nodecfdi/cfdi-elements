import type { XmlNodeInterface } from '@nodecfdi/cfdi-core/types';
import type Concepto from './concepto';
import type Retencion from './retencion';
import type Traslado from './traslado';
import AbstractElement from '../common/abstract_element';
import Addenda from './addenda';
import CfdiRelacionados from './cfdi_relacionados';
import Complemento from './complemento';
import Conceptos from './conceptos';
import Emisor from './emisor';
import Impuestos from './impuestos';
import InformacionGlobal from './informacion_global';
import Receptor from './receptor';

export default class Comprobante extends AbstractElement {
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

  public addInformacionGlobal(attributes: Record<string, unknown> = {}): InformacionGlobal {
    const subject = this.getInformacionGlobal();
    subject.addAttributes(attributes);

    return subject;
  }

  public addCfdiRelacionados(attributes: Record<string, unknown> = {}): CfdiRelacionados {
    const subject = new CfdiRelacionados(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiCfdiRelacionados(...elementAttributes: Record<string, unknown>[]): this {
    for (const attributes of elementAttributes) {
      this.addCfdiRelacionados(attributes);
    }

    return this;
  }

  public getEmisor(): Emisor {
    return this.helperGetOrAdd(new Emisor());
  }

  public addEmisor(attributes: Record<string, unknown> = {}): Emisor {
    const subject = this.getEmisor();
    subject.addAttributes(attributes);

    return subject;
  }

  public getReceptor(): Receptor {
    return this.helperGetOrAdd(new Receptor());
  }

  public addReceptor(attributes: Record<string, unknown> = {}): Receptor {
    const subject = this.getReceptor();
    subject.addAttributes(attributes);

    return subject;
  }

  public getConceptos(): Conceptos {
    return this.helperGetOrAdd(new Conceptos());
  }

  public addConceptos(attributes: Record<string, unknown> = {}): Conceptos {
    const subject = this.getConceptos();
    subject.addAttributes(attributes);

    return subject;
  }

  public getImpuestos(): Impuestos {
    return this.helperGetOrAdd(new Impuestos());
  }

  public addImpuestos(attributes: Record<string, unknown> = {}): Impuestos {
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

  public addConcepto(attributes: Record<string, unknown> = {}): Concepto {
    return this.getConceptos().addConcepto(attributes);
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
