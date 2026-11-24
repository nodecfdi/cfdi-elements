import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import type { LeyendaAttributes } from './leyenda';
import AbstractElement from '../../common/abstract_element';
import { Leyenda } from './leyenda';

export type LeyendasFiscalesAttributes = 'version';

export class LeyendasFiscales extends AbstractElement<LeyendasFiscalesAttributes> {
  public getElementName(): string {
    return 'leyendasFisc:LeyendasFiscales';
  }

  public getFixedAttributes(): Record<string, string> {
    return {
      'xmlns:leyendasFisc': 'http://www.sat.gob.mx/leyendasFiscales',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xsi:schemaLocation':
          'http://www.sat.gob.mx/leyendasFiscales http://www.sat.gob.mx/sitio_internet/cfd/leyendasFiscales/leyendasFisc.xsd',
      'version': '1.0',
    };
  }

  public addLeyenda(attributes: AttributesRecord<LeyendaAttributes> = {}): Leyenda {
    const subject = new Leyenda(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiLeyenda(...elementAttributes: AttributesRecord<LeyendaAttributes>[]): this {
    for (const attributes of elementAttributes) {
      this.addLeyenda(attributes);
    }

    return this;
  }
}
