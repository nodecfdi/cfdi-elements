import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import AbstractElement from '../common/abstract_element';
import { RemolquesCCP } from './remolques_ccp';

export type ContenedorMaritimoAttributes
  = | 'TipoContenedor'
    | 'MatriculaContenedor'
    | 'NumPrecinto'
    | 'IdCCPRelacionado'
    | 'PlacaVMCCP'
    | 'FechaCertificacionCCP';

export class ContenedorMaritimo extends AbstractElement<ContenedorMaritimoAttributes> {
  public getElementName(): string {
    return 'cartaporte31:Contenedor';
  }

  public getRemolquesCCP(): RemolquesCCP {
    return this.helperGetOrAdd(new RemolquesCCP());
  }

  public addRemolquesCCP(attributes: AttributesRecord = {}): RemolquesCCP {
    const subject = this.getRemolquesCCP();
    subject.addAttributes(attributes);

    return subject;
  }
}
