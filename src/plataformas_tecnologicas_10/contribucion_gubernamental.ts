import { Mixin } from 'ts-mixer';
import AbstractElement from '#src/common/abstract_element';

export default class ContribucionGubernamental extends Mixin(AbstractElement) {
  public getElementName(): string {
    return 'plataformasTecnologicas:ContribucionGubernamental';
  }
}
