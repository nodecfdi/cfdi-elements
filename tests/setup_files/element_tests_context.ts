/* eslint-disable vitest/valid-expect */
/* eslint-disable vitest/no-standalone-expect */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable vitest/require-top-level-describe */

import { XmlNode } from '@nodecfdi/cfdi-core';
import type AbstractElement from '#src/common/abstract_element';

type WrapMethod = (...args: unknown[]) => AbstractElement;

beforeEach(async (ctx) => {
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
        `The method ${elementClassName}.${String(adder)} should return the an instance of ${childClassName}`,
      ).toBeInstanceOf(childClass);
      expect(
        instanceTwo.getAttribute('foo'),
        `The method ${elementClassName}.${String(adder)} should write the attributes on the same instance`,
      ).toBe('bar');
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
      expect(element).toHaveLength(2);

      const multier = `multi${childClassName}` as keyof typeof element;
      const sameAsElement = (element[multier] as WrapMethod)({ id: 'third' }, { id: 'fourth' });
      expect(
        sameAsElement,
        `The method ${elementClassName}.${String(multier)} should return always the same element as the instance contained`,
      ).toBe(element);
      expect(element).toHaveLength(4);
    },
  };
});
