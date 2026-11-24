import AbstractElement from '../common/abstract_element';

export type ContenedorFerroviarioAttributes = 'TipoContenedor' | 'PesoContenedorVacio' | 'PesoNetoMercancia';

export class ContenedorFerroviario extends AbstractElement<ContenedorFerroviarioAttributes> {
  public getElementName(): string {
    return 'cartaporte31:Contenedor';
  }
}
