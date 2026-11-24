import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import type { DatosUnEnajenanteAttributes } from './datos_un_enajenante';
import { AbstractElement } from '../../common/abstract_element';
import { DatosEnajenantesCopSC } from './datos_enajenantes_cop_sc';
import { DatosUnEnajenante } from './datos_un_enajenante';

export type DatosEnajenanteAttributes = 'CoproSocConyugalE';

export class DatosEnajenante extends AbstractElement<DatosEnajenanteAttributes> {
  public getElementName(): string {
    return 'notariospublicos:DatosEnajenante';
  }

  public getChildrenOrder(): string[] {
    return [
      'notariospublicos:DatosUnEnajenante',
      'notariospublicos:DatosEnajenantesCopSC',
    ];
  }

  public getDatosUnEnajenante(): DatosUnEnajenante {
    return this.helperGetOrAdd(new DatosUnEnajenante());
  }

  public addDatosUnEnajenante(attributes: AttributesRecord<DatosUnEnajenanteAttributes> = {}): DatosUnEnajenante {
    const subject = this.getDatosUnEnajenante();
    subject.addAttributes(attributes);

    return subject;
  }

  public getDatosEnajenantesCopSC(): DatosEnajenantesCopSC {
    return this.helperGetOrAdd(new DatosEnajenantesCopSC());
  }

  public addDatosEnajenantesCopSC(attributes: AttributesRecord = {}): DatosEnajenantesCopSC {
    const subject = this.getDatosEnajenantesCopSC();
    subject.addAttributes(attributes);

    return subject;
  }
}
