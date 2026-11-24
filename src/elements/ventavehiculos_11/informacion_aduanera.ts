import { AbstractElement } from '../../common/abstract_element';

export type InformacionAduaneraAttributes = 'numero' | 'fecha' | 'aduana';

export class InformacionAduanera extends AbstractElement<InformacionAduaneraAttributes> {
  public getElementName(): string {
    return 'ventavehiculos:InformacionAduanera';
  }
}
