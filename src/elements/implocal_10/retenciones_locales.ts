import { AbstractElement } from '../../common/abstract_element';

export type RetencionesLocalesAttributes = 'ImpLocRetenido' | 'TasadeRetencion' | 'Importe';

export class RetencionesLocales extends AbstractElement<RetencionesLocalesAttributes> {
  public getElementName(): string {
    return 'implocal:RetencionesLocales';
  }
}
