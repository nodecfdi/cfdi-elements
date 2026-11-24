import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import type { DestinatarioAttributes } from './destinatario';
import type { EmisorAttributes } from './emisor';
import type { PropietarioAttributes } from './propietario';
import type { ReceptorAttributes } from './receptor';
import { AbstractElement } from '../../common/abstract_element';
import { Destinatario } from './destinatario';
import { Emisor } from './emisor';
import { Mercancias } from './mercancias';
import { Propietario } from './propietario';
import { Receptor } from './receptor';

export type ComercioExteriorAttributes
  = | 'Version'
    | 'MotivoTraslado'
    | 'ClaveDePedimento'
    | 'CertificadoOrigen'
    | 'NumCertificadoOrigen'
    | 'NumeroExportadorConfiable'
    | 'Incoterm'
    | 'Observaciones'
    | 'TipoCambioUSD'
    | 'TotalUSD';

export class ComercioExterior extends AbstractElement<ComercioExteriorAttributes> {
  public getElementName(): string {
    return 'cce20:ComercioExterior';
  }

  public getChildrenOrder(): string[] {
    return [
      'cce20:Emisor',
      'cce20:Propietario',
      'cce20:Receptor',
      'cce20:Destinatario',
      'cce20:Mercancias',
    ];
  }

  public getFixedAttributes(): Record<string, string> {
    return {
      'xmlns:cce20': 'http://www.sat.gob.mx/ComercioExterior20',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xsi:schemaLocation':
          'http://www.sat.gob.mx/ComercioExterior20 http://www.sat.gob.mx/sitio_internet/cfd/ComercioExterior20/ComercioExterior20.xsd',
      'Version': '2.0',
    };
  }

  public getEmisor(): Emisor {
    return this.helperGetOrAdd(new Emisor());
  }

  public addEmisor(attributes: AttributesRecord<EmisorAttributes> = {}): Emisor {
    const subject = this.getEmisor();
    subject.addAttributes(attributes);

    return subject;
  }

  public addPropietario(attributes: AttributesRecord<PropietarioAttributes> = {}): Propietario {
    const subject = new Propietario(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiPropietario(...elementAttributes: AttributesRecord<PropietarioAttributes>[]): this {
    for (const attributes of elementAttributes) {
      this.addPropietario(attributes);
    }

    return this;
  }

  public getReceptor(): Receptor {
    return this.helperGetOrAdd(new Receptor());
  }

  public addReceptor(attributes: AttributesRecord<ReceptorAttributes> = {}): Receptor {
    const subject = this.getReceptor();
    subject.addAttributes(attributes);

    return subject;
  }

  public addDestinatario(attributes: AttributesRecord<DestinatarioAttributes> = {}): Destinatario {
    const subject = new Destinatario(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiDestinatario(...elementAttributes: AttributesRecord<DestinatarioAttributes>[]): this {
    for (const attributes of elementAttributes) {
      this.addDestinatario(attributes);
    }

    return this;
  }

  public getMercancias(): Mercancias {
    return this.helperGetOrAdd(new Mercancias());
  }

  public addMercancias(attributes: AttributesRecord = {}): Mercancias {
    const subject = this.getMercancias();
    subject.addAttributes(attributes);

    return subject;
  }
}
