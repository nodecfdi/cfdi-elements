import { AbstractElement } from '../../common/abstract_element';

export type AportacionesODepositosAttributes = 'TipoAportacionODeposito' | 'MontAportODep' | 'RFCFiduciaria';

export class AportacionesODepositos extends AbstractElement<AportacionesODepositosAttributes> {
  public getElementName(): string {
    return 'planesderetiro11:AportacionesODepositos';
  }
}
