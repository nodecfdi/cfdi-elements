import { AbstractElement } from '../../common/abstract_element';

export type IncapacidadAttributes = 'DiasIncapacidad' | 'TipoIncapacidad' | 'ImporteMonetario';

export class Incapacidad extends AbstractElement<IncapacidadAttributes> {
  public getElementName(): string {
    return 'nomina12:Incapacidad';
  }
}
