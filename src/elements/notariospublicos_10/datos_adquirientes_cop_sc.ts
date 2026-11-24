import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import type { DatosAdquirienteCopSCAttributes } from './datos_adquiriente_cop_sc';
import AbstractElement from '../../common/abstract_element';
import { DatosAdquirienteCopSC } from './datos_adquiriente_cop_sc';

export class DatosAdquirientesCopSC extends AbstractElement {
  public getElementName(): string {
    return 'notariospublicos:DatosAdquirientesCopSC';
  }

  public addDatosAdquirienteCopSC(attributes: AttributesRecord<DatosAdquirienteCopSCAttributes> = {}): DatosAdquirienteCopSC {
    const subject = new DatosAdquirienteCopSC(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiDatosAdquirienteCopSC(...elementAttributes: AttributesRecord<DatosAdquirienteCopSCAttributes>[]): this {
    for (const attributes of elementAttributes) {
      this.addDatosAdquirienteCopSC(attributes);
    }

    return this;
  }
}
