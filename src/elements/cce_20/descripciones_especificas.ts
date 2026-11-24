import AbstractElement from '../../common/abstract_element';

export type DescripcionesEspecificasAttributes = 'Marca' | 'Modelo' | 'SubModelo' | 'NumeroSerie';

export class DescripcionesEspecificas extends AbstractElement<DescripcionesEspecificasAttributes> {
  public getElementName(): string {
    return 'cce20:DescripcionesEspecificas';
  }
}
