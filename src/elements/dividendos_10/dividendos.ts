import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import type { DividOUtilAttributes } from './divid_o_util';
import type { RemanenteAttributes } from './remanente';
import { AbstractElement } from '../../common/abstract_element';
import { DividOUtil } from './divid_o_util';
import { Remanente } from './remanente';

export type DividendosAttributes = 'Version';

export class Dividendos extends AbstractElement<DividendosAttributes> {
  public getElementName(): string {
    return 'dividendos:Dividendos';
  }

  public getChildrenOrder(): string[] {
    return [
      'dividendos:DividOUtil',
      'dividendos:Remanente',
    ];
  }

  public getFixedAttributes(): Record<string, string> {
    return {
      'xmlns:dividendos': 'http://www.sat.gob.mx/esquemas/retencionpago/1/dividendos',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xsi:schemaLocation':
          'http://www.sat.gob.mx/esquemas/retencionpago/1/dividendos http://www.sat.gob.mx/esquemas/retencionpago/1/dividendos/dividendos.xsd',
      'Version': '1.0',
    };
  }

  public getDividOUtil(): DividOUtil {
    return this.helperGetOrAdd(new DividOUtil());
  }

  public addDividOUtil(attributes: AttributesRecord<DividOUtilAttributes> = {}): DividOUtil {
    const subject = this.getDividOUtil();
    subject.addAttributes(attributes);

    return subject;
  }

  public getRemanente(): Remanente {
    return this.helperGetOrAdd(new Remanente());
  }

  public addRemanente(attributes: AttributesRecord<RemanenteAttributes> = {}): Remanente {
    const subject = this.getRemanente();
    subject.addAttributes(attributes);

    return subject;
  }
}
