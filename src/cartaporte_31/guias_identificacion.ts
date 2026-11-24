import AbstractElement from '../common/abstract_element';

export type GuiasIdentificacionAttributes = 'NumeroGuiaIdentificacion' | 'DescripGuiaIdentificacion' | 'PesoGuiaIdentificacion';

export default class GuiasIdentificacion extends AbstractElement<GuiasIdentificacionAttributes> {
  public getElementName(): string {
    return 'cartaporte31:GuiasIdentificacion';
  }
}
