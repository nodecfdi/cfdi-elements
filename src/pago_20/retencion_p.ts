import AbstractElement from '../common/abstract_element';

export type RetencionPAttributes = 'ImpuestoP' | 'ImporteP';

export class RetencionP extends AbstractElement<RetencionPAttributes> {
  public getElementName(): string {
    return 'pago20:RetencionP';
  }
}
