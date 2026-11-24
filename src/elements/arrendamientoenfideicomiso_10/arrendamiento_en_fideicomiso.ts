import { AbstractElement } from '../../common/abstract_element';

export type ArrendamientoEnFideicomisoAttributes
  = | 'Version'
    | 'PagProvEfecPorFiduc'
    | 'RendimFideicom'
    | 'DeduccCorresp'
    | 'MontTotRet'
    | 'MontResFiscDistFibras'
    | 'MontOtrosConceptDistr'
    | 'DescrMontOtrosConceptDistr';

export class ArrendamientoEnFideicomiso extends AbstractElement<ArrendamientoEnFideicomisoAttributes> {
  public getElementName(): string {
    return 'arrendamientoenfideicomiso:Arrendamientoenfideicomiso';
  }

  public getFixedAttributes(): Record<string, string> {
    return {
      'xmlns:arrendamientoenfideicomiso': 'http://www.sat.gob.mx/esquemas/retencionpago/1/arrendamientoenfideicomiso',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xsi:schemaLocation':
          'http://www.sat.gob.mx/esquemas/retencionpago/1/arrendamientoenfideicomiso http://www.sat.gob.mx/esquemas/retencionpago/1/arrendamientoenfideicomiso/arrendamientoenfideicomiso.xsd',
      'Version': '1.0',
    };
  }
}
