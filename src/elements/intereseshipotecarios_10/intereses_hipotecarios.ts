import { AbstractElement } from '../../common/abstract_element';

export type InteresesHipotecariosAttributes
  = | 'Version'
    | 'CreditoDeInstFinanc'
    | 'SaldoInsoluto'
    | 'PropDeducDelCredit'
    | 'MontTotIntNominalesDev'
    | 'MontTotIntNominalesDevYPag'
    | 'MontTotIntRealPagDeduc'
    | 'NumContrato';

export class InteresesHipotecarios extends AbstractElement<InteresesHipotecariosAttributes> {
  public getElementName(): string {
    return 'intereseshipotecarios:Intereseshipotecarios';
  }

  public getFixedAttributes(): Record<string, string> {
    return {
      'xmlns:intereseshipotecarios': 'http://www.sat.gob.mx/esquemas/retencionpago/1/intereseshipotecarios',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xsi:schemaLocation':
          'http://www.sat.gob.mx/esquemas/retencionpago/1/intereseshipotecarios http://www.sat.gob.mx/esquemas/retencionpago/1/intereseshipotecarios/intereseshipotecarios.xsd',
      'Version': '1.0',
    };
  }
}
