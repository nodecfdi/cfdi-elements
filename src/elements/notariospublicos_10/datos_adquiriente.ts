import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import type { DatosUnAdquirienteAttributes } from './datos_un_adquiriente';
import AbstractElement from '../../common/abstract_element';
import { DatosAdquirientesCopSC } from './datos_adquirientes_cop_sc';
import { DatosUnAdquiriente } from './datos_un_adquiriente';

export type DatosAdquirienteAttributes = 'CoproSocConyugalE';

export class DatosAdquiriente extends AbstractElement<DatosAdquirienteAttributes> {
  public getElementName(): string {
    return 'notariospublicos:DatosAdquiriente';
  }

  public getChildrenOrder(): string[] {
    return [
      'notariospublicos:DatosUnAdquiriente',
      'notariospublicos:DatosAdquirientesCopSC',
    ];
  }

  public getDatosUnAdquiriente(): DatosUnAdquiriente {
    return this.helperGetOrAdd(new DatosUnAdquiriente());
  }

  public addDatosUnAdquiriente(attributes: AttributesRecord<DatosUnAdquirienteAttributes> = {}): DatosUnAdquiriente {
    const subject = this.getDatosUnAdquiriente();
    subject.addAttributes(attributes);

    return subject;
  }

  public getDatosAdquirientesCopSC(): DatosAdquirientesCopSC {
    return this.helperGetOrAdd(new DatosAdquirientesCopSC());
  }

  public addDatosAdquirientesCopSC(attributes: AttributesRecord = {}): DatosAdquirientesCopSC {
    const subject = this.getDatosAdquirientesCopSC();
    subject.addAttributes(attributes);

    return subject;
  }
}
