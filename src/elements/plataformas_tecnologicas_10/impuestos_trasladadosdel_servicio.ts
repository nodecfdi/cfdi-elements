import AbstractElement from '../../common/abstract_element';

export type ImpuestosTrasladadosdelServicioAttributes
  = | 'Base'
    | 'Impuesto'
    | 'TipoFactor'
    | 'TasaCuota'
    | 'Importe';

export class ImpuestosTrasladadosdelServicio extends AbstractElement<ImpuestosTrasladadosdelServicioAttributes> {
  public getElementName(): string {
    return 'plataformasTecnologicas:ImpuestosTrasladadosdelServicio';
  }
}
