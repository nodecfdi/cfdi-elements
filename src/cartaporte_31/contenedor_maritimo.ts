import { Mixin } from 'ts-mixer';
import AbstractElement from '../common/abstract_element';
import RemolquesCCP from './remolques_ccp';

export default class ContenedorMaritimo extends Mixin(AbstractElement) {
  public getElementName(): string {
    return 'cartaporte31:Contenedor';
  }

  public getRemolquesCCP(): RemolquesCCP {
    return this.helperGetOrAdd(new RemolquesCCP());
  }

  public addRemolquesCCP(attributes: Record<string, unknown> = {}): RemolquesCCP {
    const subject = this.getRemolquesCCP();
    subject.addAttributes(attributes);

    return subject;
  }
}
