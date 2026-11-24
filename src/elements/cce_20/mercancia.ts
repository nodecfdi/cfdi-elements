import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import type { DescripcionesEspecificasAttributes } from './descripciones_especificas';
import { AbstractElement } from '../../common/abstract_element';
import { DescripcionesEspecificas } from './descripciones_especificas';

export type MercanciaAttributes
  = | 'NoIdentificacion'
    | 'FraccionArancelaria'
    | 'CantidadAduana'
    | 'UnidadAduana'
    | 'ValorUnitarioAduana'
    | 'ValorDolares';

export class Mercancia extends AbstractElement<MercanciaAttributes> {
  public getElementName(): string {
    return 'cce20:Mercancia';
  }

  public addDescripcionesEspecificas(attributes: AttributesRecord<DescripcionesEspecificasAttributes> = {}): DescripcionesEspecificas {
    const subject = new DescripcionesEspecificas(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiDescripcionesEspecificas(...elementAttributes: AttributesRecord<DescripcionesEspecificasAttributes>[]): this {
    for (const attributes of elementAttributes) {
      this.addDescripcionesEspecificas(attributes);
    }

    return this;
  }
}
