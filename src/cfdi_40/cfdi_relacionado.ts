import AbstractElement from '../common/abstract_element';

export type CfdiRelacionadoAttributes = 'UUID';

export default class CfdiRelacionado extends AbstractElement<CfdiRelacionadoAttributes> {
  public getElementName(): string {
    return 'cfdi:CfdiRelacionado';
  }
}
