import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import type { InformacionAduaneraAttributes } from './informacion_aduanera';
import AbstractElement from '../../common/abstract_element';
import { InformacionAduanera } from './informacion_aduanera';

export type ParteAttributes
  = | 'ClaveProdServ'
    | 'NoIdentificacion'
    | 'Cantidad'
    | 'Unidad'
    | 'Descripcion'
    | 'ValorUnitario'
    | 'Importe';

export class Parte extends AbstractElement<ParteAttributes> {
  public getElementName(): string {
    return 'cfdi:Parte';
  }

  public addInformacionAduanera(attributes: AttributesRecord<InformacionAduaneraAttributes> = {}): InformacionAduanera {
    const subject = new InformacionAduanera(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiInformacionAduanera(...elementAttributes: AttributesRecord<InformacionAduaneraAttributes>[]): this {
    for (const attributes of elementAttributes) {
      this.addInformacionAduanera(attributes);
    }

    return this;
  }
}
