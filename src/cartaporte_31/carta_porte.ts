import { Mixin } from 'ts-mixer';
import FiguraTransporte from '#src/cartaporte_31/figura_transporte';
import Mercancias from '#src/cartaporte_31/mercancias';
import RegimenesAduaneros from '#src/cartaporte_31/regimenes_aduaneros';
import Ubicaciones from '#src/cartaporte_31/ubicaciones';
import AbstractElement from '#src/common/abstract_element';

export default class CartaPorte extends Mixin(AbstractElement) {
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

  public addRegimenesAduaneros(attributes: Record<string, unknown> = {}): RegimenesAduaneros {
    const subject = this.getRegimenesAduaneros();
    subject.addAttributes(attributes);

    return subject;
  }

  public getUbicaciones(): Ubicaciones {
    return this.helperGetOrAdd(new Ubicaciones());
  }

  public addUbicaciones(attributes: Record<string, unknown> = {}): Ubicaciones {
    const subject = this.getUbicaciones();
    subject.addAttributes(attributes);

    return subject;
  }

  public getMercancias(): Mercancias {
    return this.helperGetOrAdd(new Mercancias());
  }

  public addMercancias(attributes: Record<string, unknown> = {}): Mercancias {
    const subject = this.getMercancias();
    subject.addAttributes(attributes);

    return subject;
  }

  public getFiguraTransporte(): FiguraTransporte {
    return this.helperGetOrAdd(new FiguraTransporte());
  }

  public addFiguraTransporte(attributes: Record<string, unknown> = {}): FiguraTransporte {
    const subject = this.getFiguraTransporte();
    subject.addAttributes(attributes);

    return subject;
  }
}
