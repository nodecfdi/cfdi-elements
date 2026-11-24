import type { AttributesRecord, XmlNodeInterface } from '@nodecfdi/cfdi-core/types';
import type { ElementInterface } from '../types';
import { isValidXmlName, XmlNode } from '@nodecfdi/cfdi-core';

export abstract class AbstractElement<TAttributes extends string = string>
  extends XmlNode<TAttributes>
  implements ElementInterface<TAttributes> {
  public constructor(
    attributes: AttributesRecord<TAttributes> = {},
    children: XmlNodeInterface[] = [],
  ) {
    super('temp:Temp');

    const elementName = this.getElementName();
    if (!isValidXmlName(elementName)) {
      throw new SyntaxError(
        `Cannot create a node with an invalid xml name: ${elementName}`,
      );
    }

    (this as unknown as { _name: string })._name = elementName;
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
    if (retrieved instanceof AbstractElement) {
      return retrieved as T;
    }

    this.addChild(element);

    return element;
  }
}
