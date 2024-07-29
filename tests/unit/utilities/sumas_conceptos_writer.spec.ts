import { nodeToXmlString, XmlNode } from '@nodecfdi/cfdi-core';
import Comprobante from '#src/cfdi_40/comprobante';
import ImpuestosLocales from '#src/implocal_10/impuestos_locales';
import SumasConceptos from '#src/utilities/sumas_conceptos';
import SumasConceptosWriter from '#src/utilities/sumas_conceptos_writer';

describe('sumas conceptos writer', () => {
  test('constructor', () => {
    const comprobante = new Comprobante();

    const sc = new SumasConceptos(comprobante);
    const writer = new SumasConceptosWriter(comprobante, sc);

    expect(writer.getComprobante()).toStrictEqual(comprobante);
    expect(writer.getPrecision()).toBe(6);
    expect(writer.getSumasConceptos()).toStrictEqual(sc);
    expect(writer.hasWriteImpuestoBase()).toBeTruthy();
  });

  test('error on other xml node not comprobante', () => {
    const comprobante = new Comprobante();
    const sc = new SumasConceptos(comprobante, 2);

    expect(() => new SumasConceptosWriter(new ImpuestosLocales(), sc, 2)).throws(
      'The argument comprobante must be a Comprobante (CFDI 3.3 or CFDI 4.0) element',
    );
  });

  test('put with empty values', () => {
    const precision = 2;
    const comprobante = new Comprobante();

    const sc = new SumasConceptos(comprobante, precision);
    const writer = new SumasConceptosWriter(comprobante, sc, precision);
    writer.put();

    expect(comprobante.getAttribute('SubTotal')).toBe('0.00');
    expect(comprobante.hasAttribute('Descuento')).toBeFalsy();
    expect(comprobante.getAttribute('Total')).toBe('0.00');
    expect(comprobante.searchNode('cfdi:Impuestos')).toBeUndefined();
  });

  test('put with empty conceptos impuestos', () => {
    const precision = 2;
    const comprobante = new Comprobante();
    comprobante.addConcepto({
      Importe: 1000,
      Descuento: 1000,
    });
    comprobante.addConcepto({
      Importe: 2000,
      Descuento: 2000,
    });

    const sc = new SumasConceptos(comprobante, precision);
    const writer = new SumasConceptosWriter(comprobante, sc, precision);
    writer.put();

    expect(comprobante.getAttribute('SubTotal')).toBe('3000.00');
    expect(comprobante.getAttribute('Descuento')).toBe('3000.00');
    expect(comprobante.getAttribute('Total')).toBe('0.00');
    expect(comprobante.searchNode('cfdi:Impuestos')).toBeUndefined();
  });

  test('put with zero conceptos impuestos', () => {
    const precision = 2;
    const comprobante = new Comprobante();
    comprobante.addConcepto({ Importe: '1000' }).addTraslado({
      Base: '1000',
      Impuesto: '002',
      TipoFactor: 'Tasa',
      TasaOCuota: '0.000000',
      Importe: '0',
    });
    comprobante.addConcepto({ Importe: '2000' }).addTraslado({
      Base: '2000',
      Impuesto: '002',
      TipoFactor: 'Tasa',
      TasaOCuota: '0.000000',
      Importe: '0',
    });

    const sc = new SumasConceptos(comprobante, precision);
    const writer = new SumasConceptosWriter(comprobante, sc, precision);
    writer.put();

    expect(comprobante.getAttribute('SubTotal')).toBe('3000.00');
    expect(comprobante.hasAttribute('Descuento')).toBeFalsy();
    expect(comprobante.getAttribute('Total')).toBe('3000.00');
    expect(comprobante.searchNode('cfdi:Impuestos')).toBeDefined();

    const impuestos = comprobante.getImpuestos();
    expect(impuestos.hasAttribute('TotalImpuestosTrasladados')).toBeTruthy();
    expect(impuestos.getAttribute('TotalImpuestosTrasladados')).toBe('0.00');
    expect(impuestos.hasAttribute('TotalImpuestosRetenidos')).toBeFalsy();
  });

  test('put with conceptos impuestos', () => {
    const precision = 2;
    const comprobante = new Comprobante();
    comprobante.addConcepto({ Importe: '2000', Descuento: '1000' }).addTraslado({
      Base: '1000',
      Impuesto: '002',
      TipoFactor: 'Tasa',
      TasaOCuota: '0.160000',
      Importe: '160',
    });
    comprobante.addConcepto({ Importe: '4000', Descuento: '2000' }).addTraslado({
      Base: '2000',
      Impuesto: '002',
      TipoFactor: 'Tasa',
      TasaOCuota: '0.160000',
      Importe: '320',
    });

    const sc = new SumasConceptos(comprobante, precision);
    const writer = new SumasConceptosWriter(comprobante, sc, precision);
    writer.put();

    expect(comprobante.getAttribute('SubTotal')).toBe('6000.00');
    expect(comprobante.getAttribute('Descuento')).toBe('3000.00');
    expect(comprobante.getAttribute('Total')).toBe('3480.00');
    expect(comprobante.searchNode('cfdi:Impuestos')).toBeDefined();

    const impuestos = comprobante.getImpuestos();
    expect(impuestos.hasAttribute('TotalImpuestosTrasladados')).toBeTruthy();
    expect(impuestos.getAttribute('TotalImpuestosTrasladados')).toBe('480.00');
    expect(impuestos.hasAttribute('TotalImpuestosRetenidos')).toBeFalsy();
  });

  test('descuento with value zero exists if a concepto has descuento', () => {
    const comprobante = new Comprobante();
    comprobante.addConcepto(); // First concepto does not have Descuento
    comprobante.addConcepto({ Descuento: '' }); // Second concepto has Descuento

    const precision = 2;
    const sc = new SumasConceptos(comprobante, precision);
    const writer = new SumasConceptosWriter(comprobante, sc, precision);
    writer.put();

    expect(comprobante.getAttribute('Descuento')).toBe('0.00');
  });

  test('descuento not set if all conceptos does not have descuento', () => {
    const comprobante = new Comprobante({ Descuento: '' });
    comprobante.addConcepto();
    comprobante.addConcepto();

    const precision = 2;
    const sc = new SumasConceptos(comprobante, precision);
    const writer = new SumasConceptosWriter(comprobante, sc, precision);
    writer.put();

    expect(comprobante.hasAttribute('Descuento')).toBeFalsy();
  });

  test('on complemento impuestos importe sum is rounded cfdi', () => {
    const comprobante = new Comprobante();
    comprobante.addConcepto().multiTraslado(
      {
        Base: '48.611106',
        Importe: '7.777777',
        Impuesto: '002',
        TipoFactor: 'Tasa',
        TasaOCuota: '0.160000',
      },
      {
        Base: '48.611106',
        Impuesto: '002',
        TipoFactor: 'Exento',
      },
    );
    comprobante.addConcepto().multiTraslado(
      {
        Base: '13.888888',
        Importe: '2.222222',
        Impuesto: '002',
        TipoFactor: 'Tasa',
        TasaOCuota: '0.160000',
      },
      {
        Base: '13.888888',
        Impuesto: '002',
        TipoFactor: 'Exento',
      },
    );

    const precision = 3;
    const sc = new SumasConceptos(comprobante, precision);
    const writer = new SumasConceptosWriter(comprobante, sc, precision);
    writer.put();

    const traslado = comprobante.searchNode('cfdi:Impuestos', 'cfdi:Traslados', 'cfdi:Traslado');
    expect(comprobante.searchAttribute('cfdi:Impuestos', 'TotalImpuestosTrasladados')).toBe(
      '10.000',
    );
    expect(traslado?.getAttribute('Importe')).toBe('10.000');
    expect(traslado?.getAttribute('Base')).toBe('62.500');

    const exento = comprobante
      .searchNodes('cfdi:Impuestos', 'cfdi:Traslados', 'cfdi:Traslado')
      .get(1);
    expect(exento.getAttribute('Base')).toBe('62.500');
  });

  test('conceptos only with traslados exentos does not write traslados', () => {
    const comprobante = new Comprobante();
    const concepto = comprobante.addConcepto();
    concepto.addTraslado({ Base: '1000', Impuesto: '002', TipoFactor: 'Exento' });
    concepto.addRetencion({
      Base: '1000.00',
      Impuesto: '001',
      TipoFactor: 'Tasa',
      TasaOCuota: '0.04000',
      Importe: '40.00',
    });
    comprobante.addConcepto().addTraslado({ Base: '1000', Impuesto: '002', TipoFactor: 'Exento' });

    const precision = 2;
    const sc = new SumasConceptos(comprobante, precision);

    const writer = new SumasConceptosWriter(comprobante, sc, precision);
    writer.put();

    expect(writer.hasWriteImpuestoBase()).toBe(writer.hasWriteExentos());

    const expected = [
      '<cfdi:Impuestos TotalImpuestosRetenidos="40.00">',
      '  <cfdi:Retenciones>',
      '    <cfdi:Retencion Impuesto="001" Importe="40.00"/>',
      '  </cfdi:Retenciones>',
      '  <cfdi:Traslados>',
      '    <cfdi:Traslado TipoFactor="Exento" Impuesto="002" Base="2000.00"/>',
      '  </cfdi:Traslados>',
      '</cfdi:Impuestos>',
    ].join('\n');

    expect(nodeToXmlString(comprobante.getImpuestos())).toEqualXML(expected);
  });

  test('set required implocal attributes', () => {
    const comprobante = new Comprobante();
    const implocal = new ImpuestosLocales();
    for (let i = 0; i < 2; i += 1) {
      implocal.addTrasladosLocales({
        ImpLocTrasladado: 'IH',
        Importe: '27.43',
        TasadeTraslado: '2.50',
      });
      implocal.addRetencionesLocales({
        ImpLocTrasladado: 'IH',
        Importe: '27.43',
        TasadeTraslado: '2.50',
      });
    }

    comprobante.addComplemento(implocal);
    const precision = 2;
    const sc = new SumasConceptos(comprobante, precision);
    const writer = new SumasConceptosWriter(comprobante, sc, precision);
    writer.put();

    expect(implocal.getAttribute('TotaldeRetenciones')).toBe('54.86');
    expect(implocal.getAttribute('TotaldeTraslados')).toBe('54.86');
  });

  test('remove implocal complement when is empty and preservers others complements', () => {
    const comprobante = new Comprobante();
    comprobante.addComplemento(new XmlNode('other:PrimerComplemento'));
    comprobante.addComplemento(new ImpuestosLocales());
    comprobante.addComplemento(new XmlNode('other:UltimoComplemento'));

    const precision = 2;
    const sc = new SumasConceptos(comprobante, precision);
    const writer = new SumasConceptosWriter(comprobante, sc, precision);
    writer.put();

    expect(comprobante.getComplemento()).toHaveLength(2);
    expect(comprobante.searchNode('cfdi:Complemento', 'other:PrimerComplemento')).toBeDefined();
    expect(comprobante.searchNode('cfdi:Complemento', 'other:UltimoComplemento')).toBeDefined();
    expect(comprobante.searchNode('cfdi:Complemento', 'implocal:ImpuestosLocales')).toBeUndefined();
  });

  test('remove implocal complement and remove complement node when is empty', () => {
    const comprobante = new Comprobante();
    comprobante.addComplemento(new ImpuestosLocales());

    const precision = 2;
    const sc = new SumasConceptos(comprobante, precision);
    const writer = new SumasConceptosWriter(comprobante, sc, precision);
    writer.put();

    expect(comprobante.searchNode('cfdi:Complemento')).toBeUndefined();
  });
});
