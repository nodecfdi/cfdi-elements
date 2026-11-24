import type { AttributesRecord, XmlNodeInterface } from '@nodecfdi/cfdi-core/types';
import type { CfdiRetenRelacionadosAttributes } from './cfdi_reten_relacionados';
import type { EmisorAttributes } from './emisor';
import type { ImpRetenidos, ImpRetenidosAttributes } from './imp_retenidos';
import type { PeriodoAttributes } from './periodo';
import type { ReceptorAttributes } from './receptor';
import type { TotalesAttributes } from './totales';
import { AbstractElement } from '../../common/abstract_element';
import { Addenda } from './addenda';
import { CfdiRetenRelacionados } from './cfdi_reten_relacionados';
import { Complemento } from './complemento';
import { Emisor } from './emisor';
import { Periodo } from './periodo';
import { Receptor } from './receptor';
import { Totales } from './totales';

export type RetencionesAttributes
  = | 'Version'
    | 'FolioInt'
    | 'Sello'
    | 'NoCertificado'
    | 'Certificado'
    | 'FechaExp'
    | 'LugarExpRetenc'
    | 'CveRetenc'
    | 'DescRetenc';

export class Retenciones extends AbstractElement<RetencionesAttributes> {
  public getElementName(): string {
    return 'retenciones:Retenciones';
  }

  public getChildrenOrder(): string[] {
    return [
      'retenciones:CfdiRetenRelacionados',
      'retenciones:Emisor',
      'retenciones:Receptor',
      'retenciones:Periodo',
      'retenciones:Totales',
      'retenciones:Complemento',
      'retenciones:Addenda',
    ];
  }

  public getFixedAttributes(): Record<string, string> {
    return {
      'xmlns:retenciones': 'http://www.sat.gob.mx/esquemas/retencionpago/2',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xsi:schemaLocation':
          'http://www.sat.gob.mx/esquemas/retencionpago/2 http://www.sat.gob.mx/esquemas/retencionpago/2/retencionpagov2.xsd',
      'Version': '2.0',
    };
  }

  public getCfdiRetenRelacionados(): CfdiRetenRelacionados {
    return this.helperGetOrAdd(new CfdiRetenRelacionados());
  }

  public addCfdiRetenRelacionados(attributes: AttributesRecord<CfdiRetenRelacionadosAttributes> = {}): CfdiRetenRelacionados {
    const subject = this.getCfdiRetenRelacionados();
    subject.addAttributes(attributes);

    return subject;
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

  public getPeriodo(): Periodo {
    return this.helperGetOrAdd(new Periodo());
  }

  public addPeriodo(attributes: AttributesRecord<PeriodoAttributes> = {}): Periodo {
    const subject = this.getPeriodo();
    subject.addAttributes(attributes);

    return subject;
  }

  public getTotales(): Totales {
    return this.helperGetOrAdd(new Totales());
  }

  public addTotales(attributes: AttributesRecord<TotalesAttributes> = {}): Totales {
    const subject = this.getTotales();
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

  public addImpRetenidos(attributes: AttributesRecord<ImpRetenidosAttributes> = {}): ImpRetenidos {
    return this.getTotales().addImpRetenidos(attributes);
  }

  public multiImpRetenidos(...elementAttributes: AttributesRecord<ImpRetenidosAttributes>[]): this {
    this.getTotales()
      .multiImpRetenidos(...elementAttributes);

    return this;
  }
}
