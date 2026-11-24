import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import type { DescriptionAttributes } from './description';
import { AbstractElement } from '../../common/abstract_element';
import { Description } from './description';
import { PalletQuantity } from './pallet_quantity';
import { Transport } from './transport';

export class PalletInformation extends AbstractElement {
  public getElementName(): string {
    return 'detallista:palletInformation';
  }

  public getChildrenOrder(): string[] {
    return [
      'detallista:palletQuantity',
      'detallista:description',
      'detallista:transport',
    ];
  }

  public getPalletQuantity(): PalletQuantity {
    return this.helperGetOrAdd(new PalletQuantity());
  }

  public addPalletQuantity(attributes: AttributesRecord = {}): PalletQuantity {
    const subject = this.getPalletQuantity();
    subject.addAttributes(attributes);

    return subject;
  }

  public getDescription(): Description {
    return this.helperGetOrAdd(new Description());
  }

  public addDescription(attributes: AttributesRecord<DescriptionAttributes> = {}): Description {
    const subject = this.getDescription();
    subject.addAttributes(attributes);

    return subject;
  }

  public getTransport(): Transport {
    return this.helperGetOrAdd(new Transport());
  }

  public addTransport(attributes: AttributesRecord = {}): Transport {
    const subject = this.getTransport();
    subject.addAttributes(attributes);

    return subject;
  }
}
