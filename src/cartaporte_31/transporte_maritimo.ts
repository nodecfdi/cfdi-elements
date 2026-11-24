import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import type { ContenedorMaritimoAttributes } from './contenedor_maritimo';
import AbstractElement from '../common/abstract_element';
import ContenedorMaritimo from './contenedor_maritimo';

export type TransporteMaritimoAttributes
  = | 'PermSCT'
    | 'NumPermisoSCT'
    | 'NombreAseg'
    | 'NumPolizaSeguro'
    | 'TipoEmbarcacion'
    | 'Matricula'
    | 'NumeroOMI'
    | 'AnioEmbarcacion'
    | 'NombreEmbarc'
    | 'NacionalidadEmbarc'
    | 'UnidadesDeArqBruto'
    | 'TipoCarga'
    | 'Eslora'
    | 'Manga'
    | 'Calado'
    | 'Puntal'
    | 'LineaNaviera'
    | 'NombreAgenteNaviero'
    | 'NumAutorizacionNaviero'
    | 'NumViaje'
    | 'NumConocEmbarc'
    | 'PermisoTempNavegacion';

export default class TransporteMaritimo extends AbstractElement<TransporteMaritimoAttributes> {
  public getElementName(): string {
    return 'cartaporte31:TransporteMaritimo';
  }

  public addContenedor(attributes: AttributesRecord<ContenedorMaritimoAttributes> = {}): ContenedorMaritimo {
    const subject = new ContenedorMaritimo(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiContenedor(...elementAttributes: AttributesRecord<ContenedorMaritimoAttributes>[]): this {
    for (const attributes of elementAttributes) {
      this.addContenedor(attributes);
    }

    return this;
  }
}
