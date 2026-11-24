import { describe, expect, test } from 'vitest';
import { ComercioExterior, DescripcionesEspecificas, Destinatario, Domicilio, Emisor, Mercancia, Mercancias, Propietario, Receptor } from '../../../src/elements/cce_20/index';

describe('cce20', () => {
  test('comercio exterior', ({ assert }) => {
    const element = new ComercioExterior();
    expect(element).toElementHasName('cce20:ComercioExterior');
    expect(element).toElementHasOrder([
      'cce20:Emisor',
      'cce20:Propietario',
      'cce20:Receptor',
      'cce20:Destinatario',
      'cce20:Mercancias',
    ]);
    expect(element).toElementHasFixedAttributes({
      'xmlns:cce20': 'http://www.sat.gob.mx/ComercioExterior20',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xsi:schemaLocation': 'http://www.sat.gob.mx/ComercioExterior20 http://www.sat.gob.mx/sitio_internet/cfd/ComercioExterior20/ComercioExterior20.xsd',
      'Version': '2.0',
    });
    assert.toElementHasChildSingle(element, Emisor);
    assert.toElementHasChildMultiple(element, Propietario);
    assert.toElementHasChildSingle(element, Receptor);
    assert.toElementHasChildMultiple(element, Destinatario);
    assert.toElementHasChildSingle(element, Mercancias);
  });

  test('emisor', ({ assert }) => {
    const element = new Emisor();
    expect(element).toElementHasName('cce20:Emisor');
    assert.toElementHasChildSingle(element, Domicilio);
  });

  test('domicilio', () => {
    const element = new Domicilio();
    expect(element).toElementHasName('cce20:Domicilio');
  });

  test('propietario', () => {
    const element = new Propietario();
    expect(element).toElementHasName('cce20:Propietario');
  });

  test('receptor', ({ assert }) => {
    const element = new Receptor();
    expect(element).toElementHasName('cce20:Receptor');
    assert.toElementHasChildSingle(element, Domicilio);
  });

  test('destinatario', ({ assert }) => {
    const element = new Destinatario();
    expect(element).toElementHasName('cce20:Destinatario');
    assert.toElementHasChildMultiple(element, Domicilio);
  });

  test('mercancias', ({ assert }) => {
    const element = new Mercancias();
    expect(element).toElementHasName('cce20:Mercancias');
    assert.toElementHasChildMultiple(element, Mercancia);
  });

  test('mercancia', ({ assert }) => {
    const element = new Mercancia();
    expect(element).toElementHasName('cce20:Mercancia');
    assert.toElementHasChildMultiple(element, DescripcionesEspecificas);
  });

  test('descripciones especificas', () => {
    const element = new DescripcionesEspecificas();
    expect(element).toElementHasName('cce20:DescripcionesEspecificas');
  });
});
