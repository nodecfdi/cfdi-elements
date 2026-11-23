import { Mixin } from 'ts-mixer';
import IdentificacionVehicular from './identificacion_vehicular';
import Remolques from './remolques';
import Seguros from './seguros';
import AbstractElement from '../common/abstract_element';

export default class Autotransporte extends Mixin(AbstractElement) {
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

  public addIdentificacionVehicular(
    attributes: Record<string, unknown> = {},
  ): IdentificacionVehicular {
    const subject = this.getIdentificacionVehicular();
    subject.addAttributes(attributes);

    return subject;
  }

  public getSeguros(): Seguros {
    return this.helperGetOrAdd(new Seguros());
  }

  public addSeguros(attributes: Record<string, unknown> = {}): Seguros {
    const subject = this.getSeguros();
    subject.addAttributes(attributes);

    return subject;
  }

  public getRemolques(): Remolques {
    return this.helperGetOrAdd(new Remolques());
  }

  public addRemolques(attributes: Record<string, unknown> = {}): Remolques {
    const subject = this.getRemolques();
    subject.addAttributes(attributes);

    return subject;
  }
}
