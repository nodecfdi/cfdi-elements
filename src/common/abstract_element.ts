import { isValidXmlName, XmlNode } from '@nodecfdi/cfdi-core';
import { type XmlNodeInterface } from '@nodecfdi/cfdi-core/types';
import { settings } from 'ts-mixer';
import { type ElementInterface } from '#src/types';

settings.initFunction = '__init';

export default abstract class AbstractElement extends XmlNode implements ElementInterface {
  public constructor(
    _attributes: Record<string, unknown> = {},
    _children: XmlNodeInterface[] = [],
  ) {
    super('temp:Temp');
  }

  protected __init(
    attributes: Record<string, unknown> = {},
    children: XmlNodeInterface[] = [],
  ): void {
    if (!isValidXmlName(this.getElementName())) {
      throw new SyntaxError(
        `Cannot create a node with an invalid xml name: ${this.getElementName()}`,
      );
    }

    (this as unknown as { _name: string })._name = this.getElementName();
    this.addAttributes({
      ...this.getFixedAttributes(),
      ...attributes,
    });
    this.children().add(...children);
    this.children().setOrder(this.getChildrenOrder());
  }

  public abstract getElementName(): string;

  public getFixedAttributes(): Record<string, string> {
    return {};
  }

  public getChildrenOrder(): string[] {
    return [];
  }

  protected helperGetOrAdd<T extends AbstractElement>(element: T): T {
    const retrieved = this.searchNode(element.getElementName());
    if (retrieved) {
      return retrieved as T;
    }

    this.addChild(element);

    return element;
  }
}
