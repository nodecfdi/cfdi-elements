import AbstractElement from '../../common/abstract_element';

export type DeterminadoAttributes = 'impuesto' | 'tasaOCuota' | 'importe';

export class Determinado extends AbstractElement<DeterminadoAttributes> {
  public getElementName(): string {
    return 'consumodecombustibles11:Determinado';
  }
}
