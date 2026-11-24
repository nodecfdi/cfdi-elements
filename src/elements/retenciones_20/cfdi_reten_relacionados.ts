import AbstractElement from '../../common/abstract_element';

export type CfdiRetenRelacionadosAttributes = 'TipoRelacion' | 'UUID';

export class CfdiRetenRelacionados extends AbstractElement<CfdiRetenRelacionadosAttributes> {
  public getElementName(): string {
    return 'retenciones:CfdiRetenRelacionados';
  }
}
