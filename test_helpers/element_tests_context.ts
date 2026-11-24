/* eslint-disable @typescript-eslint/require-await */

import type { AbstractElement } from '../src/common/abstract_element';
import { XmlNode } from '@nodecfdi/cfdi-core';
import { beforeEach, expect } from 'vitest';

beforeEach(async (ctx) => {
  type WrapMethod = (...args: unknown[]) => AbstractElement;
  ctx.assert = {
    toElementHasChildSingle(element, childClass, getterParameter, adderParameter) {
      const elementClassName = element.constructor.name;
      const childClassName = childClass.name;
      element.children().clear();

      // Element should return the same instance
      const getter = (getterParameter ?? `get${childClassName}`) as keyof typeof element;
      const instance = (element[getter] as WrapMethod)();
      expect(
        instance,
        `The method ${elementClassName}.${String(getter)} should return the an instance of ${childClassName}`,
      ).toBeInstanceOf(childClass);
      expect(
        instance,
        `The method ${elementClassName}.${String(getter)} should return always the same instance`,
      ).toBe((element[getter] as WrapMethod)());

      // Add should work on the same object
      const adder = (adderParameter ?? `add${childClassName}`) as keyof typeof element;
      const instanceTwo = (element[adder] as WrapMethod)({ foo: 'bar' });
      expect(
        instanceTwo,
        `The method ${elementClassName}.${String(adder)} should return the same instance as ${elementClassName}.${String(getter)}`,
      ).toBe(instance);
      expect(
        instance.getAttribute('foo'),
        `The method ${elementClassName}.${String(adder)} should write the attributes on the same instance`,
      ).toBe('bar');
      expect(element.children(), `The method ${elementClassName}.${String(adder)} should not append a new child`).toHaveLength(1);

      const instanceThreeEmpty = (element[adder] as WrapMethod)();
      expect(
        instanceThreeEmpty,
        `The method ${elementClassName}.${String(adder)} should return the same instance as ${elementClassName}.${String(getter)}`,
      ).toBe(instance);
      expect(
        instanceThreeEmpty.attributes(),
        `The method ${elementClassName}.${String(adder)} with empty attributes not append nothing`,
      ).toHaveLength(1);
    },

    toElementHasChildSingleAddChild(element, childClass) {
      const elementClassName = element.constructor.name;
      const childClassName = childClass.name;
      element.children().clear();

      // Element should return the same instance
      const getter = `get${childClassName}` as keyof typeof element;
      const instance = (element[getter] as WrapMethod)();
      expect(
        instance,
        `The method ${elementClassName}.${String(getter)} should return the an instance of ${childClassName}`,
      ).toBeInstanceOf(childClass);
      expect(
        instance,
        `The method ${elementClassName}.${String(getter)} should return always the same instance`,
      ).toBe((element[getter] as WrapMethod)());

      // Add should append a child into the existent node
      const adder = `add${childClassName}` as keyof typeof element;
      const firstChild = new XmlNode('child1');

      const returnOnAdder = (element[adder] as WrapMethod)(firstChild);
      expect(
        element,
        `The method ${elementClassName}.${String(adder)} should return always the element instance`,
      ).toBe(returnOnAdder);
      expect(
        [firstChild],
        'The first child should be added to the elements children',
      ).toStrictEqual([...instance.children()]);

      // Create a new children
      const secondChild = new XmlNode('child2');
      (element[adder] as WrapMethod)(secondChild);
      expect(
        [firstChild, secondChild],
        'The second child should be added to the elements children',
      ).toStrictEqual([...instance.children()]);
    },

    toElementHasChildMultiple(element, childClass, elementName) {
      const elementClassName = element.constructor.name;
      const childClassName = elementName ?? childClass.name;
      element.children().clear();

      const adder = `add${childClassName}` as keyof typeof element;
      const first = (element[adder] as WrapMethod)({ id: 'first' });
      expect(
        first,
        `The method ${elementClassName}.${String(adder)} should return the an instance of ${childClassName}`,
      ).toBeInstanceOf(childClass);
      expect(
        first.getAttribute('id'),
        `The method ${elementClassName}.${String(adder)} should write the attributes`,
      ).toBe('first');
      expect(element).toHaveLength(1);

      const second = (element[adder] as WrapMethod)();
      expect(
        second,
        `The method ${elementClassName}.${String(adder)} should return the an instance of ${childClassName}`,
      ).toBeInstanceOf(childClass);
      expect(
        second,
        `The method ${elementClassName}.${String(adder)} should return a new instance of ${childClassName}`,
      ).not.toBe(first);
      expect(element).toHaveLength(2);

      // Add with children should append them into the new instance
      const grandChildren = [new XmlNode('child1'), new XmlNode('child2')];
      const third = (element[adder] as WrapMethod)({ id: 'third' }, grandChildren);
      expect(
        [...third.children()],
        `The method ${elementClassName}.${String(adder)} should append the given children to the new instance`,
      ).toStrictEqual(grandChildren);
      expect(element).toHaveLength(3);

      const multier = `multi${childClassName}` as keyof typeof element;
      const sameAsElement = (element[multier] as WrapMethod)({ id: 'fourth' }, { id: 'fifth' });
      expect(
        sameAsElement,
        `The method ${elementClassName}.${String(multier)} should return always the same element as the instance contained`,
      ).toBe(element);
      expect(element).toHaveLength(5);
      expect([...element.children()].map((child) => child.getAttribute('id'))).toStrictEqual([
        'first',
        '',
        'third',
        'fourth',
        'fifth',
      ]);
    },

    toElementHasShortcut(element, path, target, multi = true) {
      const elementClassName = element.constructor.name;
      element.children().clear();

      const resolveContainer = (): AbstractElement => {
        let current: AbstractElement = element;
        for (const segment of path) {
          current = (current[`get${segment}` as keyof typeof current] as WrapMethod)();
        }

        return current;
      };

      const adder = `add${target}` as keyof typeof element;
      const first = (element[adder] as WrapMethod)({ id: '1' });
      const container = resolveContainer();
      expect(
        [...container.children()],
        `The method ${elementClassName}.${String(adder)} should append the child into ${path.join('/')}`,
      ).toStrictEqual([first]);
      expect(first.getAttribute('id')).toBe('1');

      const second = (element[adder] as WrapMethod)();
      expect(second, `The method ${elementClassName}.${String(adder)} should return a new instance`).not.toBe(first);
      expect(resolveContainer(), `The method ${elementClassName}.${String(adder)} should reuse the containers`).toBe(container);
      expect(container.children()).toHaveLength(2);

      if (!multi) {
        expect(element).not.toHaveProperty(`multi${target}`);

        return;
      }

      const multier = `multi${target}` as keyof typeof element;
      const sameAsElement = (element[multier] as WrapMethod)({ id: '3' }, { id: '4' });
      expect(
        sameAsElement,
        `The method ${elementClassName}.${String(multier)} should return always the same element instance`,
      ).toBe(element);
      expect([...container.children()].map((child) => child.getAttribute('id'))).toStrictEqual(['1', '', '3', '4']);
    },
  };
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<T> = new (...args: any[]) => T;

declare module 'vitest' {
  interface TestContext {
    assert: {
      toElementHasChildSingle: <Y extends AbstractElement>(
        element: AbstractElement,
        childClass: Constructor<Y>,
        getterParameter?: string,
        adderParameter?: string,
      ) => void;
      toElementHasChildSingleAddChild: <Y extends AbstractElement>(
        element: AbstractElement,
        childClass: Constructor<Y>,
      ) => void;
      toElementHasChildMultiple: <Y extends AbstractElement>(
        element: AbstractElement,
        childClass: Constructor<Y>,
        elementName?: string,
      ) => void;
      toElementHasShortcut: (
        element: AbstractElement,
        path: string[],
        target: string,
        multi?: boolean,
      ) => void;
    };
  }
}
