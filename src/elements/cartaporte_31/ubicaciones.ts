import type { AttributesRecord } from '@nodecfdi/cfdi-core/types';
import type { UbicacionAttributes } from './ubicacion';
import { AbstractElement } from '../../common/abstract_element';
import { Ubicacion } from './ubicacion';

export class Ubicaciones extends AbstractElement {
  public getElementName(): string {
    return 'cartaporte31:Ubicaciones';
  }

  public addUbicacion(attributes: AttributesRecord<UbicacionAttributes> = {}): Ubicacion {
    const subject = new Ubicacion(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiUbicacion(...elementAttributes: AttributesRecord<UbicacionAttributes>[]): this {
    for (const attributes of elementAttributes) {
      this.addUbicacion(attributes);
    }

    return this;
  }
}
