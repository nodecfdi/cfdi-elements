import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import type { EntidadSNCFAttributes } from './entidad_sncf';
import AbstractElement from '../../common/abstract_element';
import { EntidadSNCF } from './entidad_sncf';

export type EmisorAttributes = 'Curp' | 'RegistroPatronal' | 'RfcPatronOrigen';

export class Emisor extends AbstractElement<EmisorAttributes> {
  public getElementName(): string {
    return 'nomina12:Emisor';
  }

  public getEntidadSNCF(): EntidadSNCF {
    return this.helperGetOrAdd(new EntidadSNCF());
  }

  public addEntidadSNCF(attributes: AttributesRecord<EntidadSNCFAttributes> = {}): EntidadSNCF {
    const subject = this.getEntidadSNCF();
    subject.addAttributes(attributes);

    return subject;
  }
}
