import { AbstractElement } from '../../common/abstract_element';

export type TransporteAereoAttributes
  = | 'PermSCT'
    | 'NumPermisoSCT'
    | 'MatriculaAeronave'
    | 'NombreAseg'
    | 'NumPolizaSeguro'
    | 'NumeroGuia'
    | 'LugarContrato'
    | 'CodigoTransportista'
    | 'RFCEmbarcador'
    | 'NumRegIdTribEmbarc'
    | 'ResidenciaFiscalEmbarc'
    | 'NombreEmbarcador';

export class TransporteAereo extends AbstractElement<TransporteAereoAttributes> {
  public getElementName(): string {
    return 'cartaporte31:TransporteAereo';
  }
}
