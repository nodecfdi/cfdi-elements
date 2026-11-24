import { XmlNode } from '@nodecfdi/cfdi-core';
import { describe, expect, test } from 'vitest';
import { EmptyElement, InvalidNameElement, SampleElement } from '../../../test_helpers/fake_elements';

describe('abstract element', () => {
  test('throws when the element name is not a valid xml name', () => {
    expect(() => new InvalidNameElement()).toThrow(SyntaxError);
    expect(() => new InvalidNameElement()).toThrow('Cannot create a node with an invalid xml name: invalid name');
  });

  test('default fixed attributes and children order are empty', () => {
    const element = new EmptyElement();
    expect(element.name()).toBe('x:Empty');
    expect(element.getFixedAttributes()).toStrictEqual({});
    expect(element.getChildrenOrder()).toStrictEqual([]);
    expect(element.attributes()).toHaveLength(0);
  });

  test('constructor merges fixed attributes and allows to override them', () => {
    const element = new SampleElement({ Fixed: 'overridden', Other: 'value' });
    expect(element.attributes().export()).toStrictEqual({
      Version: '1.0',
      Fixed: 'overridden',
      Other: 'value',
    });
  });

  test('constructor appends children and sorts them using the children order', () => {
    const second = new XmlNode('x:Second');
    const first = new XmlNode('x:First');
    const element = new SampleElement({}, [second, first]);
    expect([...element.children()]).toStrictEqual([first, second]);
  });
});
