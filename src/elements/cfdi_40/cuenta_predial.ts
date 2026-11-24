import { AbstractElement } from '../../common/abstract_element';

export type CuentaPredialAttributes = 'Numero';

export class CuentaPredial extends AbstractElement<CuentaPredialAttributes> {
  public getElementName(): string {
    return 'cfdi:CuentaPredial';
  }
}
