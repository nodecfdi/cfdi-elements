import { Mixin } from 'ts-mixer';
import AbstractElement from '#src/common/abstract_element';
import DoctoRelacionado from '#src/pago_20/docto_relacionado';
import ImpuestosP from '#src/pago_20/impuestos_p';

export default class Pago extends Mixin(AbstractElement) {
  public getElementName(): string {
    return 'pago20:Pago';
  }

  public getChildrenOrder(): string[] {
    return ['pago20:DoctoRelacionado', 'pago20:ImpuestosP'];
  }

  public addDoctoRelacionado(attributes: Record<string, unknown> = {}): DoctoRelacionado {
    const subject = new DoctoRelacionado(attributes);
    this.addChild(subject);

    return subject;
  }

  public multiDoctoRelacionado(...elementAttributes: Record<string, unknown>[]): this {
    for (const attributes of elementAttributes) {
      this.addDoctoRelacionado(attributes);
    }

    return this;
  }

  public getImpuestosP(): ImpuestosP {
    return this.helperGetOrAdd(new ImpuestosP());
  }

  public addImpuestosP(attributes: Record<string, unknown> = {}): ImpuestosP {
    const subject = this.getImpuestosP();
    subject.addAttributes(attributes);

    return subject;
  }
}
