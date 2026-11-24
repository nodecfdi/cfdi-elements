import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import AbstractElement from '../../common/abstract_element';
import { Conceptos } from './conceptos';

export type ConsumoDeCombustiblesAttributes
  = | 'version'
    | 'tipoOperacion'
    | 'numeroDeCuenta'
    | 'subTotal'
    | 'total';

export class ConsumoDeCombustibles extends AbstractElement<ConsumoDeCombustiblesAttributes> {
  public getElementName(): string {
    return 'consumodecombustibles11:ConsumoDeCombustibles';
  }

  public getFixedAttributes(): Record<string, string> {
    return {
      'xmlns:consumodecombustibles11': 'http://www.sat.gob.mx/ConsumoDeCombustibles11',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xsi:schemaLocation':
          'http://www.sat.gob.mx/ConsumoDeCombustibles11 http://www.sat.gob.mx/sitio_internet/cfd/consumodecombustibles/consumodeCombustibles11.xsd',
      'version': '1.1',
    };
  }

  public getConceptos(): Conceptos {
    return this.helperGetOrAdd(new Conceptos());
  }

  public addConceptos(attributes: AttributesRecord = {}): Conceptos {
    const subject = this.getConceptos();
    subject.addAttributes(attributes);

    return subject;
  }
}
