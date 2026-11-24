import AbstractElement from '../../common/abstract_element';

export type PeriodoAttributes = 'MesIni' | 'MesFin' | 'Ejercicio';

export class Periodo extends AbstractElement<PeriodoAttributes> {
  public getElementName(): string {
    return 'retenciones:Periodo';
  }
}
