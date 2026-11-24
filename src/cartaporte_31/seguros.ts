import AbstractElement from '../common/abstract_element';

export type SegurosAttributes
  = | 'AseguraRespCivil'
    | 'PolizaRespCivil'
    | 'AseguraMedAmbiente'
    | 'PolizaMedAmbiente'
    | 'AseguraCarga'
    | 'PolizaCarga'
    | 'PrimaSeguro';

export default class Seguros extends AbstractElement<SegurosAttributes> {
  public getElementName(): string {
    return 'cartaporte31:Seguros';
  }
}
