import type { AttributesRecord, XmlNodeInterface } from '@nodecfdi/cfdi-core/types';
import type { DatosEnajenanteCopSCAttributes } from './datos_enajenante_cop_sc';
import { AbstractElement } from '../../common/abstract_element';
import { DatosEnajenanteCopSC } from './datos_enajenante_cop_sc';

export class DatosEnajenantesCopSC extends AbstractElement {
  public getElementName(): string {
    return 'notariospublicos:DatosEnajenantesCopSC';
  }

  public addDatosEnajenanteCopSC(attributes: AttributesRecord<DatosEnajenanteCopSCAttributes> = {}, children: XmlNodeInterface[] = []): DatosEnajenanteCopSC {
    const subject = new DatosEnajenanteCopSC(attributes, children);
    this.addChild(subject);

    return subject;
  }

  public multiDatosEnajenanteCopSC(...elementAttributes: AttributesRecord<DatosEnajenanteCopSCAttributes>[]): this {
    for (const attributes of elementAttributes) {
      this.addDatosEnajenanteCopSC(attributes);
    }

    return this;
  }
}
