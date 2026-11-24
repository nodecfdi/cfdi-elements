import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import type { DomicilioAttributes } from './domicilio';
import AbstractElement from '../common/abstract_element';
import Domicilio from './domicilio';

export type UbicacionAttributes
  = | 'TipoUbicacion'
    | 'IDUbicacion'
    | 'RFCRemitenteDestinatario'
    | 'NombreRemitenteDestinatario'
    | 'NumRegIdTrib'
    | 'ResidenciaFiscal'
    | 'NumEstacion'
    | 'NombreEstacion'
    | 'NavegacionTrafico'
    | 'FechaHoraSalidaLlegada'
    | 'TipoEstacion'
    | 'DistanciaRecorrida';

export default class Ubicacion extends AbstractElement<UbicacionAttributes> {
  public getElementName(): string {
    return 'cartaporte31:Ubicacion';
  }

  public getDomicilio(): Domicilio {
    return this.helperGetOrAdd(new Domicilio());
  }

  public addDomicilio(attributes: AttributesRecord<DomicilioAttributes> = {}): Domicilio {
    const subject = this.getDomicilio();
    subject.addAttributes(attributes);

    return subject;
  }
}
