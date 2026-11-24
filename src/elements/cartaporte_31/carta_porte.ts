import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import type { MercanciasAttributes } from './mercancias';
import AbstractElement from '../../common/abstract_element';
import { FiguraTransporte } from './figura_transporte';
import { Mercancias } from './mercancias';
import { RegimenesAduaneros } from './regimenes_aduaneros';
import { Ubicaciones } from './ubicaciones';

export type CartaPorteAttributes
  = | 'Version'
    | 'IdCCP'
    | 'TranspInternac'
    | 'EntradaSalidaMerc'
    | 'PaisOrigenDestino'
    | 'ViaEntradaSalida'
    | 'TotalDistRec'
    | 'RegistroISTMO'
    | 'UbicacionPoloOrigen'
    | 'UbicacionPoloDestino';

export class CartaPorte extends AbstractElement<CartaPorteAttributes> {
  public getElementName(): string {
    return 'cartaporte31:CartaPorte';
  }

  public getChildrenOrder(): string[] {
    return [
      'cartaporte31:RegimenesAduaneros',
      'cartaporte31:Ubicaciones',
      'cartaporte31:Mercancias',
      'cartaporte31:FiguraTransporte',
    ];
  }

  public getFixedAttributes(): Record<string, string> {
    return {
      'xmlns:cartaporte31': 'http://www.sat.gob.mx/CartaPorte31',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xsi:schemaLocation':
          'http://www.sat.gob.mx/CartaPorte31 http://www.sat.gob.mx/sitio_internet/cfd/CartaPorte/CartaPorte31.xsd',
      'Version': '3.1',
    };
  }

  public getRegimenesAduaneros(): RegimenesAduaneros {
    return this.helperGetOrAdd(new RegimenesAduaneros());
  }

  public addRegimenesAduaneros(attributes: AttributesRecord = {}): RegimenesAduaneros {
    const subject = this.getRegimenesAduaneros();
    subject.addAttributes(attributes);

    return subject;
  }

  public getUbicaciones(): Ubicaciones {
    return this.helperGetOrAdd(new Ubicaciones());
  }

  public addUbicaciones(attributes: AttributesRecord = {}): Ubicaciones {
    const subject = this.getUbicaciones();
    subject.addAttributes(attributes);

    return subject;
  }

  public getMercancias(): Mercancias {
    return this.helperGetOrAdd(new Mercancias());
  }

  public addMercancias(attributes: AttributesRecord<MercanciasAttributes> = {}): Mercancias {
    const subject = this.getMercancias();
    subject.addAttributes(attributes);

    return subject;
  }

  public getFiguraTransporte(): FiguraTransporte {
    return this.helperGetOrAdd(new FiguraTransporte());
  }

  public addFiguraTransporte(attributes: AttributesRecord = {}): FiguraTransporte {
    const subject = this.getFiguraTransporte();
    subject.addAttributes(attributes);

    return subject;
  }
}
