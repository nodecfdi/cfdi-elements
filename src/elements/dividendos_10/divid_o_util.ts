import AbstractElement from '../../common/abstract_element';

export type DividOUtilAttributes
  = | 'CveTipDivOUtil'
    | 'MontISRAcredRetMexico'
    | 'MontISRAcredRetExtranjero'
    | 'MontRetExtDivExt'
    | 'TipoSocDistrDiv'
    | 'MontISRAcredNal'
    | 'MontDivAcumNal'
    | 'MontDivAcumExt';

export class DividOUtil extends AbstractElement<DividOUtilAttributes> {
  public getElementName(): string {
    return 'dividendos:DividOUtil';
  }
}
