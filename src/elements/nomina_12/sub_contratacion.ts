import AbstractElement from '../../common/abstract_element';

export type SubContratacionAttributes = 'RfcLabora' | 'PorcentajeTiempo';

export class SubContratacion extends AbstractElement<SubContratacionAttributes> {
  public getElementName(): string {
    return 'nomina12:SubContratacion';
  }
}
