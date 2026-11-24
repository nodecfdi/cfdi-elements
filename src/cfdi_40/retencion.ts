import AbstractElement from '../common/abstract_element';

export type RetencionAttributes
  = | 'Base'
    | 'Impuesto'
    | 'TipoFactor'
    | 'TasaOCuota'
    | 'Importe';

export class Retencion extends AbstractElement<RetencionAttributes> {
  public getElementName(): string {
    return 'cfdi:Retencion';
  }
}
