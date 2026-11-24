import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import type { ImpRetenidosAttributes } from './imp_retenidos';
import { AbstractElement } from '../../common/abstract_element';
import { ImpRetenidos } from './imp_retenidos';

export type TotalesAttributes
  = | 'MontoTotOperacion'
    | 'MontoTotGrav'
    | 'MontoTotExent'
    | 'MontoTotRet'
    | 'UtilidadBimestral'
    | 'ISRCorrespondiente';

export class Totales extends AbstractElement<TotalesAttributes> {
  public getElementName(): string {
    return 'retenciones:Totales';
  }

  public addImpRetenidos(attributes: AttributesRecord<ImpRetenidosAttributes> = {}): ImpRetenidos {
    const subject = new ImpRetenidos(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiImpRetenidos(...elementAttributes: AttributesRecord<ImpRetenidosAttributes>[]): this {
    for (const attributes of elementAttributes) {
      this.addImpRetenidos(attributes);
    }

    return this;
  }
}
