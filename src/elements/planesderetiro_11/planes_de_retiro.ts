import type { AttributesRecord, XmlNodeInterface } from '@nodecfdi/cfdi-core/types';
import type { AportacionesODepositosAttributes } from './aportaciones_o_depositos';
import { AbstractElement } from '../../common/abstract_element';
import { AportacionesODepositos } from './aportaciones_o_depositos';

export type PlanesDeRetiroAttributes
  = | 'Version'
    | 'SistemaFinanc'
    | 'MontTotAportAnioInmAnterior'
    | 'MontIntRealesDevengAniooInmAnt'
    | 'HuboRetirosAnioInmAntPer'
    | 'MontTotRetiradoAnioInmAntPer'
    | 'MontTotExentRetiradoAnioInmAnt'
    | 'MontTotExedenteAnioInmAnt'
    | 'HuboRetirosAnioInmAnt'
    | 'MontTotRetiradoAnioInmAnt'
    | 'NumReferencia';

export class PlanesDeRetiro extends AbstractElement<PlanesDeRetiroAttributes> {
  public getElementName(): string {
    return 'planesderetiro11:Planesderetiro';
  }

  public getFixedAttributes(): Record<string, string> {
    return {
      'xmlns:planesderetiro11': 'http://www.sat.gob.mx/esquemas/retencionpago/1/planesderetiro11',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xsi:schemaLocation':
          'http://www.sat.gob.mx/esquemas/retencionpago/1/planesderetiro11 http://www.sat.gob.mx/esquemas/retencionpago/1/planesderetiro11/planesderetiro11.xsd',
      'Version': '1.1',
    };
  }

  public addAportacionesODepositos(attributes: AttributesRecord<AportacionesODepositosAttributes> = {}, children: XmlNodeInterface[] = []): AportacionesODepositos {
    const subject = new AportacionesODepositos(attributes, children);
    this.addChild(subject);

    return subject;
  }

  public multiAportacionesODepositos(...elementAttributes: AttributesRecord<AportacionesODepositosAttributes>[]): this {
    for (const attributes of elementAttributes) {
      this.addAportacionesODepositos(attributes);
    }

    return this;
  }
}
