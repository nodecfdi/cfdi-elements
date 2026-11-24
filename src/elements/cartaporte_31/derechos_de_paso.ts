import AbstractElement from '../../common/abstract_element';

export type DerechosDePasoAttributes = 'TipoDerechoDePaso' | 'KilometrajePagado';

export class DerechosDePaso extends AbstractElement<DerechosDePasoAttributes> {
  public getElementName(): string {
    return 'cartaporte31:DerechosDePaso';
  }
}
