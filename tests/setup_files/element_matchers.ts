import 'jest-xml-matcher';
import type AbstractElement from '#src/common/abstract_element';

expect.extend({
  toElementHasName(received: AbstractElement, expected: string) {
    const { isNot } = this;
    const elementClass = received.constructor.name;

    return {
      pass: received.getElementName() === expected && received.name() === expected,
      message: () =>
        `The element ${elementClass} should ${isNot ? 'not ' : ''}have the name "${expected}", actually is ${received.name()}`,
    };
  },
  toElementHasFixedAttributes(received: AbstractElement, expected: Record<string, string>) {
    const { isNot } = this;
    const elementClass = received.constructor.name;

    return {
      pass: Object.entries(expected).every(([key, value]) => received.getAttribute(key) === value),
      message: () =>
        `The element ${elementClass} should ${isNot ? 'not ' : ''}have the attributes ${JSON.stringify(expected)}, actually is ${JSON.stringify(received.attributes().export())}`,
    };
  },
  toElementHasOrder(received: AbstractElement, expected: string[]) {
    const { isNot } = this;
    const elementClass = received.constructor.name;

    return {
      pass: JSON.stringify(received.getChildrenOrder()) === JSON.stringify(expected),
      message: () =>
        `The element ${elementClass} should ${isNot ? 'not ' : ''}have the same children order, actually is ${JSON.stringify(received.getChildrenOrder())}`,
    };
  },
});
