/* eslint-disable @typescript-eslint/no-explicit-any */
import 'vitest';
import type AbstractElement from '#src/common/abstract_element';

type Constructor<T> = new (...args: any[]) => T;

interface CustomMatchers<R = unknown> {
  toElementHasName(expected: string): R;
  toElementHasFixedAttributes(expected: Record<string, string>): R;
  toElementHasOrder(expected: string[]): R;
}

// interface AsyncCustomMatchers<R = unknown> {

// }

declare module 'vitest' {
  interface Assertion<T = unknown> extends CustomMatchers<T> {}

  // interface AsymmetricMatchersContaining extends AsyncCustomMatchers {}

  interface TestContext {
    assert: {
      toElementHasChildSingle<T extends AbstractElement, Y extends AbstractElement>(
        element: T,
        childClass: Constructor<Y>,
        getterParameter?: string,
        adderParameter?: string,
      ): void;
      toElementHasChildSingleAddChild<T extends AbstractElement, Y extends AbstractElement>(
        element: T,
        childClass: Constructor<Y>,
      ): void;
      toElementHasChildMultiple<T extends AbstractElement, Y extends AbstractElement>(
        element: T,
        childClass: Constructor<Y>,
        elementName?: string,
      ): void;
    };
  }
}
