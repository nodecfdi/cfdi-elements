import { describe, expect, test } from 'vitest';
import {
  Autotransporte,
  CantidadTransporta,
  Carro,
  CartaPorte,
  ContenedorFerroviario,
  ContenedorMaritimo,
  DerechosDePaso,
  DetalleMercancia,
  DocumentacionAduanera,
  Domicilio,
  FiguraTransporte,
  GuiasIdentificacion,
  IdentificacionVehicular,
  Mercancia,
  Mercancias,
  PartesTransporte,
  RegimenAduaneroCCP,
  RegimenesAduaneros,
  Remolque,
  RemolqueCCP,
  Remolques,
  RemolquesCCP,
  Seguros,
  TiposFigura,
  TransporteAereo,
  TransporteFerroviario,
  TransporteMaritimo,
  Ubicacion,
  Ubicaciones,
} from '../../../../src/elements/cartaporte_31/index';

describe('cartaporte31', () => {
  test('carta porte', ({ assert }) => {
    const element = new CartaPorte();
    expect(element).toElementHasName('cartaporte31:CartaPorte');
    expect(element).toElementHasOrder([
      'cartaporte31:RegimenesAduaneros',
      'cartaporte31:Ubicaciones',
      'cartaporte31:Mercancias',
      'cartaporte31:FiguraTransporte',
    ]);
    expect(element).toElementHasFixedAttributes({
      'xmlns:cartaporte31': 'http://www.sat.gob.mx/CartaPorte31',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xsi:schemaLocation':
        'http://www.sat.gob.mx/CartaPorte31 http://www.sat.gob.mx/sitio_internet/cfd/CartaPorte/CartaPorte31.xsd',
      'Version': '3.1',
    });
    assert.toElementHasChildSingle(element, RegimenesAduaneros);
    assert.toElementHasChildSingle(element, Ubicaciones);
    assert.toElementHasChildSingle(element, Mercancias);
    assert.toElementHasChildSingle(element, FiguraTransporte);
  });

  test('regimenes aduaneros', ({ assert }) => {
    const element = new RegimenesAduaneros();
    expect(element).toElementHasName('cartaporte31:RegimenesAduaneros');
    assert.toElementHasChildMultiple(element, RegimenAduaneroCCP);
  });

  test('regimen aduanero ccp', () => {
    const element = new RegimenAduaneroCCP();
    expect(element).toElementHasName('cartaporte31:RegimenAduaneroCCP');
  });

  test('ubicaciones', ({ assert }) => {
    const element = new Ubicaciones();
    expect(element).toElementHasName('cartaporte31:Ubicaciones');
    assert.toElementHasChildMultiple(element, Ubicacion);
  });

  test('ubicacion', ({ assert }) => {
    const element = new Ubicacion();
    expect(element).toElementHasName('cartaporte31:Ubicacion');
    assert.toElementHasChildSingle(element, Domicilio);
  });

  test('domicilio', () => {
    const element = new Domicilio();
    expect(element).toElementHasName('cartaporte31:Domicilio');
  });

  test('mercancias', ({ assert }) => {
    const element = new Mercancias();
    expect(element).toElementHasName('cartaporte31:Mercancias');
    expect(element).toElementHasOrder([
      'cartaporte31:Mercancia',
      'cartaporte31:Autotransporte',
      'cartaporte31:TransporteMaritimo',
      'cartaporte31:TransporteAereo',
      'cartaporte31:TransporteFerroviario',
    ]);
    assert.toElementHasChildMultiple(element, Mercancia);
    assert.toElementHasChildSingle(element, Autotransporte);
    assert.toElementHasChildSingle(element, TransporteMaritimo);
    assert.toElementHasChildSingle(element, TransporteAereo);
    assert.toElementHasChildSingle(element, TransporteFerroviario);
  });

  test('mercancia', ({ assert }) => {
    const element = new Mercancia();
    expect(element).toElementHasName('cartaporte31:Mercancia');
    expect(element).toElementHasOrder([
      'cartaporte31:DocumentacionAduanera',
      'cartaporte31:GuiasIdentificacion',
      'cartaporte31:CantidadTransporta',
      'cartaporte31:DetalleMercancia',
    ]);
    assert.toElementHasChildMultiple(element, DocumentacionAduanera);
    assert.toElementHasChildMultiple(element, GuiasIdentificacion);
    assert.toElementHasChildMultiple(element, CantidadTransporta);
    assert.toElementHasChildSingle(element, DetalleMercancia);
  });

  test('documentacion aduanera', () => {
    const element = new DocumentacionAduanera();
    expect(element).toElementHasName('cartaporte31:DocumentacionAduanera');
  });

  test('guias identificacion', () => {
    const element = new GuiasIdentificacion();
    expect(element).toElementHasName('cartaporte31:GuiasIdentificacion');
  });

  test('cantidad transporta', () => {
    const element = new CantidadTransporta();
    expect(element).toElementHasName('cartaporte31:CantidadTransporta');
  });

  test('detalle mercancia', () => {
    const element = new DetalleMercancia();
    expect(element).toElementHasName('cartaporte31:DetalleMercancia');
  });

  test('autotransporte', ({ assert }) => {
    const element = new Autotransporte();
    expect(element).toElementHasName('cartaporte31:Autotransporte');
    expect(element).toElementHasOrder([
      'cartaporte31:IdentificacionVehicular',
      'cartaporte31:Seguros',
      'cartaporte31:Remolques',
    ]);
    assert.toElementHasChildSingle(element, IdentificacionVehicular);
    assert.toElementHasChildSingle(element, Seguros);
    assert.toElementHasChildSingle(element, Remolques);
  });

  test('identificacion vehicular', () => {
    const element = new IdentificacionVehicular();
    expect(element).toElementHasName('cartaporte31:IdentificacionVehicular');
  });

  test('seguros', () => {
    const element = new Seguros();
    expect(element).toElementHasName('cartaporte31:Seguros');
  });

  test('remolques', ({ assert }) => {
    const element = new Remolques();
    expect(element).toElementHasName('cartaporte31:Remolques');
    assert.toElementHasChildMultiple(element, Remolque);
  });

  test('remolque', () => {
    const element = new Remolque();
    expect(element).toElementHasName('cartaporte31:Remolque');
  });

  test('transporte maritimo', ({ assert }) => {
    const element = new TransporteMaritimo();
    expect(element).toElementHasName('cartaporte31:TransporteMaritimo');
    assert.toElementHasChildMultiple(element, ContenedorMaritimo, 'Contenedor');
  });

  test('contenedor maritimo', ({ assert }) => {
    const element = new ContenedorMaritimo();
    expect(element).toElementHasName('cartaporte31:Contenedor');
    assert.toElementHasChildSingle(element, RemolquesCCP);
  });

  test('remolques ccp', ({ assert }) => {
    const element = new RemolquesCCP();
    expect(element).toElementHasName('cartaporte31:RemolquesCCP');
    assert.toElementHasChildMultiple(element, RemolqueCCP);
  });

  test('remolque ccp', () => {
    const element = new RemolqueCCP();
    expect(element).toElementHasName('cartaporte31:RemolqueCCP');
  });

  test('transporte aereo', () => {
    const element = new TransporteAereo();
    expect(element).toElementHasName('cartaporte31:TransporteAereo');
  });

  test('transporte ferroviario', ({ assert }) => {
    const element = new TransporteFerroviario();
    expect(element).toElementHasName('cartaporte31:TransporteFerroviario');
    expect(element).toElementHasOrder(['cartaporte31:DerechosDePaso', 'cartaporte31:Carro']);
    assert.toElementHasChildMultiple(element, DerechosDePaso);
    assert.toElementHasChildMultiple(element, Carro);
  });

  test('derechos de paso', () => {
    const element = new DerechosDePaso();
    expect(element).toElementHasName('cartaporte31:DerechosDePaso');
  });

  test('carro', ({ assert }) => {
    const element = new Carro();
    expect(element).toElementHasName('cartaporte31:Carro');
    assert.toElementHasChildMultiple(element, ContenedorFerroviario, 'Contenedor');
  });

  test('contenedor ferroviario', () => {
    const element = new ContenedorFerroviario();
    expect(element).toElementHasName('cartaporte31:Contenedor');
  });

  test('figura transporte', ({ assert }) => {
    const element = new FiguraTransporte();
    expect(element).toElementHasName('cartaporte31:FiguraTransporte');
    assert.toElementHasChildMultiple(element, TiposFigura);
  });

  test('tipos figura', ({ assert }) => {
    const element = new TiposFigura();
    expect(element).toElementHasName('cartaporte31:TiposFigura');
    expect(element).toElementHasOrder(['cartaporte31:PartesTransporte', 'cartaporte31:Domicilio']);
    assert.toElementHasChildMultiple(element, PartesTransporte);
    assert.toElementHasChildSingle(element, Domicilio);
  });

  test('partes transporte', () => {
    const element = new PartesTransporte();
    expect(element).toElementHasName('cartaporte31:PartesTransporte');
  });
});
