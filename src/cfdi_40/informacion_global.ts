import AbstractElement from '../common/abstract_element';

export type InformacionGlobalAttributes = 'Periodicidad' | 'Meses' | 'Año';

export class InformacionGlobal extends AbstractElement<InformacionGlobalAttributes> {
  public getElementName(): string {
    return 'cfdi:InformacionGlobal';
  }
}
