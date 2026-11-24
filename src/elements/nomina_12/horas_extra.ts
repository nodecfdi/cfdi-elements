import { AbstractElement } from '../../common/abstract_element';

export type HorasExtraAttributes = 'Dias' | 'TipoHoras' | 'HorasExtra' | 'ImportePagado';

export class HorasExtra extends AbstractElement<HorasExtraAttributes> {
  public getElementName(): string {
    return 'nomina12:HorasExtra';
  }
}
