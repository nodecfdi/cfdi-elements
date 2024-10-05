import { Mixin } from 'ts-mixer';
import RemolquesCCP from '#src/cartaporte_31/remolques_ccp';
import AbstractElement from '#src/common/abstract_element';

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
