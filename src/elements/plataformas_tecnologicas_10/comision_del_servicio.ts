import AbstractElement from '../../common/abstract_element';

export type ComisionDelServicioAttributes = 'Base' | 'Porcentaje' | 'Importe';

export class ComisionDelServicio extends AbstractElement<ComisionDelServicioAttributes> {
  public getElementName(): string {
    return 'plataformasTecnologicas:ComisionDelServicio';
  }
}
