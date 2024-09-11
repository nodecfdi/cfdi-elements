import ComisionDelServicio from '#src/plataformas_tecnologicas_10/comision_del_servicio';
import ContribucionGubernamental from '#src/plataformas_tecnologicas_10/contribucion_gubernamental';
import DetallesDelServicio from '#src/plataformas_tecnologicas_10/detalles_del_servicio';
import ImpuestosTrasladadosdelServicio from '#src/plataformas_tecnologicas_10/impuestos_trasladadosdel_servicio';
import Servicios from '#src/plataformas_tecnologicas_10/servicios';
import ServiciosPlataformasTecnologicas from '#src/plataformas_tecnologicas_10/servicios_plataformas_tecnologicas';

describe('plataformasTecnologicas10', () => {
  test('plataformas tecnologicas', ({ assert }) => {
    const element = new ServiciosPlataformasTecnologicas();
    expect(element).toElementHasName('plataformasTecnologicas:ServiciosPlataformasTecnologicas');
    expect(element).toElementHasFixedAttributes({
      'xmlns:plataformasTecnologicas':
        'http://www.sat.gob.mx/esquemas/retencionpago/1/PlataformasTecnologicas10',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xsi:schemaLocation':
        'http://www.sat.gob.mx/esquemas/retencionpago/1/PlataformasTecnologicas10 http://www.sat.gob.mx/esquemas/retencionpago/1/PlataformasTecnologicas10/ServiciosPlataformasTecnologicas10.xsd',
      'Version': '1.0',
    });
    assert.toElementHasChildSingle(element, Servicios);
  });

  test('servicios', ({ assert }) => {
    const element = new Servicios();
    expect(element).toElementHasName('plataformasTecnologicas:Servicios');
    assert.toElementHasChildMultiple(element, DetallesDelServicio);
  });

  test('detalles del servicio', ({ assert }) => {
    const element = new DetallesDelServicio();
    expect(element).toElementHasName('plataformasTecnologicas:DetallesDelServicio');
    expect(element).toElementHasOrder([
      'plataformasTecnologicas:ImpuestosTrasladadosdelServicio',
      'plataformasTecnologicas:ContribucionGubernamental',
      'plataformasTecnologicas:ComisionDelServicio',
    ]);
    assert.toElementHasChildSingle(element, ImpuestosTrasladadosdelServicio);
    assert.toElementHasChildSingle(element, ContribucionGubernamental);
    assert.toElementHasChildSingle(element, ComisionDelServicio);
  });

  test('impuestos trasladados', () => {
    const element = new ImpuestosTrasladadosdelServicio();
    expect(element).toElementHasName('plataformasTecnologicas:ImpuestosTrasladadosdelServicio');
  });

  test('contribucion gubernamental', () => {
    const element = new ContribucionGubernamental();
    expect(element).toElementHasName('plataformasTecnologicas:ContribucionGubernamental');
  });

  test('comision del servicio', () => {
    const element = new ComisionDelServicio();
    expect(element).toElementHasName('plataformasTecnologicas:ComisionDelServicio');
  });
});
