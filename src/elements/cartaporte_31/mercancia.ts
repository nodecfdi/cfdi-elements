import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import type { CantidadTransportaAttributes } from './cantidad_transporta';
import type { DetalleMercanciaAttributes } from './detalle_mercancia';
import type { DocumentacionAduaneraAttributes } from './documentacion_aduanera';
import type { GuiasIdentificacionAttributes } from './guias_identificacion';
import { AbstractElement } from '../../common/abstract_element';
import { CantidadTransporta } from './cantidad_transporta';
import { DetalleMercancia } from './detalle_mercancia';
import { DocumentacionAduanera } from './documentacion_aduanera';
import { GuiasIdentificacion } from './guias_identificacion';

export type MercanciaAttributes
  = | 'BienesTransp'
    | 'ClaveSTCC'
    | 'Descripcion'
    | 'Cantidad'
    | 'ClaveUnidad'
    | 'Unidad'
    | 'Dimensiones'
    | 'MaterialPeligroso'
    | 'CveMaterialPeligroso'
    | 'Embalaje'
    | 'DescripEmbalaje'
    | 'SectorCOFEPRIS'
    | 'NombreIngredienteActivo'
    | 'NomQuimico'
    | 'DenominacionGenericaProd'
    | 'DenominacionDistintivaProd'
    | 'Fabricante'
    | 'FechaCaducidad'
    | 'LoteMedicamento'
    | 'FormaFarmaceutica'
    | 'CondicionesEspTransp'
    | 'RegistroSanitarioFolioAutorizacion'
    | 'PermisoImportacion'
    | 'FolioImpoVUCEM'
    | 'NumCAS'
    | 'RazonSocialEmpImp'
    | 'NumRegSanPlagCOFEPRIS'
    | 'DatosFabricante'
    | 'DatosFormulador'
    | 'DatosMaquilador'
    | 'UsoAutorizado'
    | 'PesoEnKg'
    | 'ValorMercancia'
    | 'Moneda'
    | 'FraccionArancelaria'
    | 'UUIDComercioExt'
    | 'TipoMateria'
    | 'DescripcionMateria';

export class Mercancia extends AbstractElement<MercanciaAttributes> {
  public getElementName(): string {
    return 'cartaporte31:Mercancia';
  }

  public getChildrenOrder(): string[] {
    return [
      'cartaporte31:DocumentacionAduanera',
      'cartaporte31:GuiasIdentificacion',
      'cartaporte31:CantidadTransporta',
      'cartaporte31:DetalleMercancia',
    ];
  }

  public addDocumentacionAduanera(attributes: AttributesRecord<DocumentacionAduaneraAttributes> = {}): DocumentacionAduanera {
    const subject = new DocumentacionAduanera(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiDocumentacionAduanera(...elementAttributes: AttributesRecord<DocumentacionAduaneraAttributes>[]): this {
    for (const attributes of elementAttributes) {
      this.addDocumentacionAduanera(attributes);
    }

    return this;
  }

  public addGuiasIdentificacion(attributes: AttributesRecord<GuiasIdentificacionAttributes> = {}): GuiasIdentificacion {
    const subject = new GuiasIdentificacion(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiGuiasIdentificacion(...elementAttributes: AttributesRecord<GuiasIdentificacionAttributes>[]): this {
    for (const attributes of elementAttributes) {
      this.addGuiasIdentificacion(attributes);
    }

    return this;
  }

  public addCantidadTransporta(attributes: AttributesRecord<CantidadTransportaAttributes> = {}): CantidadTransporta {
    const subject = new CantidadTransporta(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiCantidadTransporta(...elementAttributes: AttributesRecord<CantidadTransportaAttributes>[]): this {
    for (const attributes of elementAttributes) {
      this.addCantidadTransporta(attributes);
    }

    return this;
  }

  public getDetalleMercancia(): DetalleMercancia {
    return this.helperGetOrAdd(new DetalleMercancia());
  }

  public addDetalleMercancia(attributes: AttributesRecord<DetalleMercanciaAttributes> = {}): DetalleMercancia {
    const subject = this.getDetalleMercancia();
    subject.addAttributes(attributes);

    return subject;
  }
}
