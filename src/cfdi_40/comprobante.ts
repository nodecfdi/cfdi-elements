import { type XmlNodeInterface } from '@nodecfdi/cfdi-core/types';
import { Mixin } from 'ts-mixer';
import Addenda from '#src/cfdi_40/addenda';
import CfdiRelacionados from '#src/cfdi_40/cfdi_relacionados';
import Complemento from '#src/cfdi_40/complemento';
import type Concepto from '#src/cfdi_40/concepto';
import Conceptos from '#src/cfdi_40/conceptos';
import Emisor from '#src/cfdi_40/emisor';
import Impuestos from '#src/cfdi_40/impuestos';
import InformacionGlobal from '#src/cfdi_40/informacion_global';
import WithImpuestos from '#src/cfdi_40/mixins/with_impuestos';
import Receptor from '#src/cfdi_40/receptor';
import AbstractElement from '#src/common/abstract_element';

export default class Comprobante extends Mixin(AbstractElement, WithImpuestos) {
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
      'xmlns:cfdi': 'http://www.sat.gob.mx/cfd/4',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xsi:schemaLocation':
        'http://www.sat.gob.mx/cfd/4 http://www.sat.gob.mx/sitio_internet/cfd/4/cfdv40.xsd',
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
}
