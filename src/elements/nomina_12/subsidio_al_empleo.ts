import { AbstractElement } from '../../common/abstract_element';

export type SubsidioAlEmpleoAttributes = 'SubsidioCausado';

export class SubsidioAlEmpleo extends AbstractElement<SubsidioAlEmpleoAttributes> {
  public getElementName(): string {
    return 'nomina12:SubsidioAlEmpleo';
  }
}
