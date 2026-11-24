import AbstractElement from '../../common/abstract_element';

export type ImpRetenidosAttributes = 'BaseRet' | 'ImpuestoRet' | 'MontoRet' | 'TipoPagoRet';

export class ImpRetenidos extends AbstractElement<ImpRetenidosAttributes> {
  public getElementName(): string {
    return 'retenciones:ImpRetenidos';
  }
}
