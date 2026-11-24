import { AbstractElement } from '../../common/abstract_element';

export type InteresesAttributes
  = | 'Version'
    | 'SistFinanciero'
    | 'RetiroAORESRetInt'
    | 'OperFinancDerivad'
    | 'MontIntNominal'
    | 'MontIntReal'
    | 'Perdida';

export class Intereses extends AbstractElement<InteresesAttributes> {
  public getElementName(): string {
    return 'intereses:Intereses';
  }

  public getFixedAttributes(): Record<string, string> {
    return {
      'xmlns:intereses': 'http://www.sat.gob.mx/esquemas/retencionpago/1/intereses',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xsi:schemaLocation':
          'http://www.sat.gob.mx/esquemas/retencionpago/1/intereses http://www.sat.gob.mx/esquemas/retencionpago/1/intereses/intereses.xsd',
      'Version': '1.0',
    };
  }
}
