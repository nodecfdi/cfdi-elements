import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import type { BeneficiarioAttributes } from './beneficiario';
import type { NoBeneficiarioAttributes } from './no_beneficiario';
import AbstractElement from '../../common/abstract_element';
import { Beneficiario } from './beneficiario';
import { NoBeneficiario } from './no_beneficiario';

export type PagosaextranjerosAttributes = 'Version' | 'EsBenefEfectDelCobro';

export class Pagosaextranjeros extends AbstractElement<PagosaextranjerosAttributes> {
  public getElementName(): string {
    return 'pagosaextranjeros:Pagosaextranjeros';
  }

  public getChildrenOrder(): string[] {
    return [
      'pagosaextranjeros:NoBeneficiario',
      'pagosaextranjeros:Beneficiario',
    ];
  }

  public getFixedAttributes(): Record<string, string> {
    return {
      'xmlns:pagosaextranjeros': 'http://www.sat.gob.mx/esquemas/retencionpago/1/pagosaextranjeros',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xsi:schemaLocation':
          'http://www.sat.gob.mx/esquemas/retencionpago/1/pagosaextranjeros http://www.sat.gob.mx/esquemas/retencionpago/1/pagosaextranjeros/pagosaextranjeros.xsd',
      'Version': '1.0',
    };
  }

  public getNoBeneficiario(): NoBeneficiario {
    return this.helperGetOrAdd(new NoBeneficiario());
  }

  public addNoBeneficiario(attributes: AttributesRecord<NoBeneficiarioAttributes> = {}): NoBeneficiario {
    const subject = this.getNoBeneficiario();
    subject.addAttributes(attributes);

    return subject;
  }

  public getBeneficiario(): Beneficiario {
    return this.helperGetOrAdd(new Beneficiario());
  }

  public addBeneficiario(attributes: AttributesRecord<BeneficiarioAttributes> = {}): Beneficiario {
    const subject = this.getBeneficiario();
    subject.addAttributes(attributes);

    return subject;
  }
}
