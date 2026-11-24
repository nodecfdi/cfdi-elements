import AbstractElement from '../../common/abstract_element';

export type EntidadSNCFAttributes = 'OrigenRecurso' | 'MontoRecursoPropio';

export class EntidadSNCF extends AbstractElement<EntidadSNCFAttributes> {
  public getElementName(): string {
    return 'nomina12:EntidadSNCF';
  }
}
