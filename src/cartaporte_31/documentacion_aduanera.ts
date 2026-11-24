import AbstractElement from '../common/abstract_element';

export type DocumentacionAduaneraAttributes = 'TipoDocumento' | 'NumPedimento' | 'IdentDocAduanero' | 'RFCImpo';

export class DocumentacionAduanera extends AbstractElement<DocumentacionAduaneraAttributes> {
  public getElementName(): string {
    return 'cartaporte31:DocumentacionAduanera';
  }
}
