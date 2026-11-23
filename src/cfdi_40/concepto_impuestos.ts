import { Mixin } from 'ts-mixer';
import Impuestos from './impuestos';

export default class ConceptoImpuestos extends Mixin(Impuestos) {
  public getChildrenOrder(): string[] {
    return ['cfdi:Traslados', 'cfdi:Retenciones'];
  }
}
