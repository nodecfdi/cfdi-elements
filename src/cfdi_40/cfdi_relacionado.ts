import AbstractElement from '../common/abstract_element';

export type CfdiRelacionadoAttributes = 'UUID';

export class CfdiRelacionado extends AbstractElement<CfdiRelacionadoAttributes> {
  public getElementName(): string {
    return 'cfdi:CfdiRelacionado';
  }
}
