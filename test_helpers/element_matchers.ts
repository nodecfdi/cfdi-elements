import type { AbstractElement } from '../src/common/abstract_element';
import { XmlNode } from '@nodecfdi/cfdi-core';
import { expect } from 'vitest';

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

    if (JSON.stringify(received.getChildrenOrder()) !== JSON.stringify(expected)) {
      return {
        pass: false,
        message: () =>
          `The element ${elementClass} should ${isNot ? 'not ' : ''}have the same children order, actually is ${JSON.stringify(received.getChildrenOrder())}`,
      };
    }

    // Children added in reverse order must be sorted, use a fresh instance to not alter the received element
    const fresh = new (received.constructor as new () => AbstractElement)();
    for (const name of expected.toReversed()) {
      fresh.addChild(new XmlNode(name));
    }

    const sorted = [...fresh.children()].map((child) => child.name());

    return {
      pass: JSON.stringify(sorted) === JSON.stringify(expected),
      message: () =>
        `The element ${elementClass} should ${isNot ? 'not ' : ''}sort its children as ${JSON.stringify(expected)}, actually is ${JSON.stringify(sorted)}`,
    };
  },
});

interface ElementMatchers<R = unknown> {
  toElementHasName: (expected: string) => R;
  toElementHasFixedAttributes: (expected: Record<string, string>) => R;
  toElementHasOrder: (expected: string[]) => R;
}

declare module 'vitest' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Assertion<R extends void | Promise<void> = void, T = unknown>
    extends ElementMatchers<R> {}

  interface AsymmetricMatchersContaining extends ElementMatchers {}
}
