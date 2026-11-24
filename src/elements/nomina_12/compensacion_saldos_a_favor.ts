import { AbstractElement } from '../../common/abstract_element';

export type CompensacionSaldosAFavorAttributes = 'SaldoAFavor' | 'Año' | 'RemanenteSalFav';

export class CompensacionSaldosAFavor extends AbstractElement<CompensacionSaldosAFavorAttributes> {
  public getElementName(): string {
    return 'nomina12:CompensacionSaldosAFavor';
  }
}
