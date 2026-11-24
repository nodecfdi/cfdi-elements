import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import type { IdentificacionVehicularAttributes } from './identificacion_vehicular';
import type { SegurosAttributes } from './seguros';
import AbstractElement from '../common/abstract_element';
import { IdentificacionVehicular } from './identificacion_vehicular';
import { Remolques } from './remolques';
import { Seguros } from './seguros';

export type AutotransporteAttributes = 'PermSCT' | 'NumPermisoSCT';

export class Autotransporte extends AbstractElement<AutotransporteAttributes> {
  public getElementName(): string {
    return 'cartaporte31:Autotransporte';
  }

  public getChildrenOrder(): string[] {
    return [
      'cartaporte31:IdentificacionVehicular',
      'cartaporte31:Seguros',
      'cartaporte31:Remolques',
    ];
  }

  public getIdentificacionVehicular(): IdentificacionVehicular {
    return this.helperGetOrAdd(new IdentificacionVehicular());
  }

  public addIdentificacionVehicular(attributes: AttributesRecord<IdentificacionVehicularAttributes> = {}): IdentificacionVehicular {
    const subject = this.getIdentificacionVehicular();
    subject.addAttributes(attributes);

    return subject;
  }

  public getSeguros(): Seguros {
    return this.helperGetOrAdd(new Seguros());
  }

  public addSeguros(attributes: AttributesRecord<SegurosAttributes> = {}): Seguros {
    const subject = this.getSeguros();
    subject.addAttributes(attributes);

    return subject;
  }

  public getRemolques(): Remolques {
    return this.helperGetOrAdd(new Remolques());
  }

  public addRemolques(attributes: AttributesRecord = {}): Remolques {
    const subject = this.getRemolques();
    subject.addAttributes(attributes);

    return subject;
  }
}
