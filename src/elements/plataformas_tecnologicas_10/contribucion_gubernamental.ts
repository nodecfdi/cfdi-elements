import { AbstractElement } from '../../common/abstract_element';

export type ContribucionGubernamentalAttributes = 'ImpContrib' | 'EntidadDondePagaLaContribucion';

export class ContribucionGubernamental extends AbstractElement<ContribucionGubernamentalAttributes> {
  public getElementName(): string {
    return 'plataformasTecnologicas:ContribucionGubernamental';
  }
}
