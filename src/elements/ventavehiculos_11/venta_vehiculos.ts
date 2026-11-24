import type { AttributesRecord, XmlNodeInterface } from '@nodecfdi/cfdi-core/types';
import type { InformacionAduaneraAttributes } from './informacion_aduanera';
import type { ParteAttributes } from './parte';
import { AbstractElement } from '../../common/abstract_element';
import { InformacionAduanera } from './informacion_aduanera';
import { Parte } from './parte';

export type VentaVehiculosAttributes = 'version' | 'ClaveVehicular' | 'Niv';

export class VentaVehiculos extends AbstractElement<VentaVehiculosAttributes> {
  public getElementName(): string {
    return 'ventavehiculos:VentaVehiculos';
  }

  public getChildrenOrder(): string[] {
    return [
      'ventavehiculos:InformacionAduanera',
      'ventavehiculos:Parte',
    ];
  }

  public getFixedAttributes(): Record<string, string> {
    return {
      'xmlns:ventavehiculos': 'http://www.sat.gob.mx/ventavehiculos',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xsi:schemaLocation':
          'http://www.sat.gob.mx/ventavehiculos http://www.sat.gob.mx/sitio_internet/cfd/ventavehiculos/ventavehiculos11.xsd',
      'version': '1.1',
    };
  }

  public addInformacionAduanera(attributes: AttributesRecord<InformacionAduaneraAttributes> = {}, children: XmlNodeInterface[] = []): InformacionAduanera {
    const subject = new InformacionAduanera(attributes, children);
    this.addChild(subject);

    return subject;
  }

  public multiInformacionAduanera(...elementAttributes: AttributesRecord<InformacionAduaneraAttributes>[]): this {
    for (const attributes of elementAttributes) {
      this.addInformacionAduanera(attributes);
    }

    return this;
  }

  public addParte(attributes: AttributesRecord<ParteAttributes> = {}, children: XmlNodeInterface[] = []): Parte {
    const subject = new Parte(attributes, children);
    this.addChild(subject);

    return subject;
  }

  public multiParte(...elementAttributes: AttributesRecord<ParteAttributes>[]): this {
    for (const attributes of elementAttributes) {
      this.addParte(attributes);
    }

    return this;
  }
}
