import { AbstractElement } from '../src/common/abstract_element';

/**
 * Element whose name is not a valid xml name, used to test the constructor validation
 */
export class InvalidNameElement extends AbstractElement {
  public getElementName(): string {
    return 'invalid name';
  }
}

/**
 * Element without fixed attributes nor children order, used to test the defaults
 */
export class EmptyElement extends AbstractElement {
  public getElementName(): string {
    return 'x:Empty';
  }
}

/**
 * Element with fixed attributes and children order
 */
export class SampleElement extends AbstractElement {
  public getElementName(): string {
    return 'x:Sample';
  }

  public getFixedAttributes(): Record<string, string> {
    return { Version: '1.0', Fixed: 'yes' };
  }

  public getChildrenOrder(): string[] {
    return ['x:First', 'x:Second'];
  }
}
