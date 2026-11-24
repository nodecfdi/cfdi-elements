import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import AbstractElement from '../../common/abstract_element';
import { Determinados } from './determinados';

export type ConceptoConsumoDeCombustiblesAttributes
  = | 'identificador'
    | 'fecha'
    | 'rfc'
    | 'claveEstacion'
    | 'tipoCombustible'
    | 'cantidad'
    | 'nombreCombustible'
    | 'folioOperacion'
    | 'valorUnitario'
    | 'importe';

export class ConceptoConsumoDeCombustibles extends AbstractElement<ConceptoConsumoDeCombustiblesAttributes> {
  public getElementName(): string {
    return 'consumodecombustibles11:ConceptoConsumoDeCombustibles';
  }

  public getDeterminados(): Determinados {
    return this.helperGetOrAdd(new Determinados());
  }

  public addDeterminados(attributes: AttributesRecord = {}): Determinados {
    const subject = this.getDeterminados();
    subject.addAttributes(attributes);

    return subject;
  }
}
