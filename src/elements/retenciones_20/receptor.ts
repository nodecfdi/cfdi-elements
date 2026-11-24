import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import type { ExtranjeroAttributes } from './extranjero';
import type { NacionalAttributes } from './nacional';
import { AbstractElement } from '../../common/abstract_element';
import { Extranjero } from './extranjero';
import { Nacional } from './nacional';

export type ReceptorAttributes = 'NacionalidadR';

export class Receptor extends AbstractElement<ReceptorAttributes> {
  public getElementName(): string {
    return 'retenciones:Receptor';
  }

  public getChildrenOrder(): string[] {
    return [
      'retenciones:Nacional',
      'retenciones:Extranjero',
    ];
  }

  public getNacional(): Nacional {
    return this.helperGetOrAdd(new Nacional());
  }

  public addNacional(attributes: AttributesRecord<NacionalAttributes> = {}): Nacional {
    const subject = this.getNacional();
    subject.addAttributes(attributes);

    return subject;
  }

  public getExtranjero(): Extranjero {
    return this.helperGetOrAdd(new Extranjero());
  }

  public addExtranjero(attributes: AttributesRecord<ExtranjeroAttributes> = {}): Extranjero {
    const subject = this.getExtranjero();
    subject.addAttributes(attributes);

    return subject;
  }
}
