import { type XmlNodeInterface } from '@nodecfdi/cfdi-core/types';

export interface ElementInterface extends XmlNodeInterface {
  getElementName(): string;

  getFixedAttributes(): Record<string, string>;

  getChildrenOrder(): string[];
}
