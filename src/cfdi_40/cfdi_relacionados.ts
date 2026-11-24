import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import type { CfdiRelacionadoAttributes } from './cfdi_relacionado';
import AbstractElement from '../common/abstract_element';
import CfdiRelacionado from './cfdi_relacionado';

export type CfdiRelacionadosAttributes = 'TipoRelacion';

export default class CfdiRelacionados extends AbstractElement<CfdiRelacionadosAttributes> {
  public getElementName(): string {
    return 'cfdi:CfdiRelacionados';
  }

  public addCfdiRelacionado(attributes: AttributesRecord<CfdiRelacionadoAttributes> = {}): CfdiRelacionado {
    const subject = new CfdiRelacionado(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiCfdiRelacionado(...elementAttributes: AttributesRecord<CfdiRelacionadoAttributes>[]): this {
    for (const attributes of elementAttributes) {
      this.addCfdiRelacionado(attributes);
    }

    return this;
  }
}
