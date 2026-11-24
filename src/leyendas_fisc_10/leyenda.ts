import AbstractElement from '../common/abstract_element';

export type LeyendaAttributes = 'disposicionFiscal' | 'norma' | 'textoLeyenda';

export default class Leyenda extends AbstractElement<LeyendaAttributes> {
  public getElementName(): string {
    return 'leyendasFisc:Leyenda';
  }
}
