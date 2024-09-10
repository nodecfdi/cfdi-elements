import { Mixin } from 'ts-mixer';
import AbstractElement from '#src/common/abstract_element';

export default class ImpuestosTrasladadosdelServicio extends Mixin(AbstractElement) {
  public getElementName(): string {
    return 'plataformasTecnologicas:ImpuestosTrasladadosdelServicio';
  }
}
