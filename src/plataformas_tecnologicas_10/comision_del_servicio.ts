import AbstractElement from '../common/abstract_element';

export type ComisionDelServicioAttributes = 'Base' | 'Porcentaje' | 'Importe';

export default class ComisionDelServicio extends AbstractElement<ComisionDelServicioAttributes> {
  public getElementName(): string {
    return 'plataformasTecnologicas:ComisionDelServicio';
  }
}
