# Scripts

En este espacio se encuentran las herramientas de desarrollo internas para generación de código.

**Importante:** Estas herramientas no están diseñadas para trabajar fuera de esta librería ni se deben
incluir en el paquete distribuible.

## Comandos

Actualmente se incluyen tres scripts de ayuda ejecutados con `tsx`: uno para crear o actualizar el archivo
de especificación (incluyendo extracción de estructura y atributos desde el XSD), otro para generar los
elementos tipados (junto con su `index.ts`) a partir de una especificación y otro para generar el archivo
base de tests unitarios del módulo.

Al ejecutar cualquiera de los comandos sobre una especificación o módulo nuevo, su comando se registra
automáticamente en las secciones correspondientes al final de este documento si aún no existe.

### Script `make:specification`

Crea o actualiza un archivo de especificación JSON con el esquema `root` / `children`. Solo requiere el
`<schema-location>` (URL o archivo XSD local): infiere automáticamente el nombre del archivo (`prefix` +
versión), `prefix`, `xml-namespace`, `version-attribute`, `version-value`, árbol de nodos, `attributes`,
`singleAddChild` (nodos con `<xs:any>`) y colisiones estructurales (`ConceptoImpuestos`):

```sh
pnpm make:specification [opciones] <schema-location>
```

### Script `make:elements`

Fabrica las clases de elementos tipados y su `index.ts` a partir de un archivo de especificación:

```sh
pnpm make:elements [opciones] <specification-file> <output-directory>
```

Con `--sync-xsd` (o `--xsd <archivo-o-url>`) actualiza primero `"attributes"` en el archivo de
especificación a partir del XSD y luego genera las clases con tipos `*Attributes` y `AttributesRecord`.
Con `--with-tests` genera también el test base si aún no existe. Para omitir el formateo automático con
ESLint se puede pasar `--no-beautify`.

### Script `make:tests`

Genera el archivo de tests unitarios base (`tests/unit/elements/<spec>/<root>.test.ts`) validando nombre de elemento,
orden de hijos, atributos fijos del nodo raíz, hijos (`single`, `singleAddChild`, `multiple`) y `shortcuts`
a partir del archivo de especificación:

```sh
pnpm make:tests [opciones] <specification-file> [output-path]
```

Por seguridad, si el archivo de test ya existe **no lo sobrescribe** (para preservar casos de prueba
adicionales agregados manualmente), a menos que se pase `-f` / `--force`.

Para ver la ayuda completa de cada script:

```sh
pnpm make:specification --help
pnpm make:elements --help
pnpm make:tests --help
```

---

## Comandos de Especificaciones (`make:specification`)

Comandos exactos para reproducir cada especificación en `scripts/elements_maker/specifications/`:

<!-- specifications:start -->

### `cartaporte_31`

```sh
pnpm make:specification http://www.sat.gob.mx/sitio_internet/cfd/CartaPorte/CartaPorte31.xsd
```

### `cfdi_40`

```sh
pnpm make:specification http://www.sat.gob.mx/sitio_internet/cfd/4/cfdv40.xsd \
  --shortcut ':Conceptos->Concepto:single' \
  --shortcut ':Impuestos.Traslados->Traslado' \
  --shortcut ':Impuestos.Retenciones->Retencion' \
  --shortcut 'Conceptos.Concepto:Impuestos.Traslados->Traslado' \
  --shortcut 'Conceptos.Concepto:Impuestos.Retenciones->Retencion'
```

### `donat_11`

```sh
pnpm make:specification http://www.sat.gob.mx/sitio_internet/cfd/donat/donat11.xsd
```

### `implocal_10`

```sh
pnpm make:specification http://www.sat.gob.mx/sitio_internet/cfd/implocal/implocal.xsd
```

### `leyendas_fisc_10`

```sh
pnpm make:specification http://www.sat.gob.mx/sitio_internet/cfd/leyendasFiscales/leyendasFisc.xsd
```

### `pago_20`

```sh
pnpm make:specification http://www.sat.gob.mx/sitio_internet/cfd/Pagos/Pagos20.xsd
```

### `plataformas_tecnologicas_10`

```sh
pnpm make:specification http://www.sat.gob.mx/esquemas/retencionpago/1/PlataformasTecnologicas10/ServiciosPlataformasTecnologicas10.xsd
```

### `tfd_11`

```sh
pnpm make:specification http://www.sat.gob.mx/sitio_internet/cfd/TimbreFiscalDigital/TimbreFiscalDigitalv11.xsd
```

### `cce_20`

```sh
pnpm make:specification http://www.sat.gob.mx/sitio_internet/cfd/ComercioExterior20/ComercioExterior20.xsd
```

### `nomina_12`

```sh
pnpm make:specification http://www.sat.gob.mx/sitio_internet/cfd/nomina/nomina12.xsd
```

### `retenciones_20`

```sh
pnpm make:specification http://www.sat.gob.mx/esquemas/retencionpago/2/retencionpagov2.xsd \
  --shortcut ':Totales->ImpRetenidos'
```

### `notariospublicos_10`

```sh
pnpm make:specification http://www.sat.gob.mx/sitio_internet/cfd/notariospublicos/notariospublicos.xsd
```

### `consumodecombustibles_11`

```sh
pnpm make:specification http://www.sat.gob.mx/sitio_internet/cfd/consumodecombustibles/consumodeCombustibles11.xsd
```

### `dividendos_10`

```sh
pnpm make:specification http://www.sat.gob.mx/esquemas/retencionpago/1/dividendos/dividendos.xsd
```

### `pagosaextranjeros_10`

```sh
pnpm make:specification http://www.sat.gob.mx/esquemas/retencionpago/1/pagosaextranjeros/pagosaextranjeros.xsd \
  --rename .=PagosAExtranjeros
```

### `servicioparcial_10`

```sh
pnpm make:specification http://www.sat.gob.mx/sitio_internet/cfd/servicioparcialconstruccion/servicioparcialconstruccion.xsd \
  --rename .=ParcialesConstruccion
```

### `iedu_10`

```sh
pnpm make:specification http://www.sat.gob.mx/sitio_internet/cfd/iedu/iedu.xsd
```

### `ine_11`

```sh
pnpm make:specification http://www.sat.gob.mx/sitio_internet/cfd/ine/ine11.xsd
```

### `ventavehiculos_11`

```sh
pnpm make:specification http://www.sat.gob.mx/sitio_internet/cfd/ventavehiculos/ventavehiculos11.xsd
```

### `detallista`

```sh
pnpm make:specification http://www.sat.gob.mx/sitio_internet/cfd/detallista/detallista.xsd \
  --rename ShipTo.nameAndAddress=ShipToNameAndAddress \
  --rename InvoiceCreator.nameAndAddress=InvoiceCreatorNameAndAddress \
  --rename AllowanceCharge.monetaryAmountOrPercentage=AllowanceChargeMonetaryAmountOrPercentage \
  --rename LineItem.AdditionalInformation=LineItemAdditionalInformation \
  --rename LineItem.Customs=LineItemCustoms \
  --rename LineItem.LineItemCustoms.nameAndAddress=CustomsNameAndAddress \
  --rename LineItem.allowanceCharge=LineItemAllowanceCharge \
  --rename LineItem.LineItemAllowanceCharge.monetaryAmountOrPercentage=LineItemMonetaryAmountOrPercentage
```

### `intereses_10`

```sh
pnpm make:specification http://www.sat.gob.mx/esquemas/retencionpago/1/intereses/intereses.xsd
```

### `intereseshipotecarios_10`

```sh
pnpm make:specification http://www.sat.gob.mx/esquemas/retencionpago/1/intereseshipotecarios/intereseshipotecarios.xsd --rename .=InteresesHipotecarios
```

### `planesderetiro_11`

```sh
pnpm make:specification http://www.sat.gob.mx/esquemas/retencionpago/1/planesderetiro11/planesderetiro11.xsd \
  --rename .=PlanesDeRetiro
```

### `enajenaciondeacciones_10`

```sh
pnpm make:specification http://www.sat.gob.mx/esquemas/retencionpago/1/enajenaciondeacciones/enajenaciondeacciones.xsd \
  --rename .=EnajenacionDeAcciones
```

### `arrendamientoenfideicomiso_10`

```sh
pnpm make:specification http://www.sat.gob.mx/esquemas/retencionpago/1/arrendamientoenfideicomiso/arrendamientoenfideicomiso.xsd \
  --rename .=ArrendamientoEnFideicomiso
```

<!-- specifications:end -->

---

## Comandos de Generación de Elementos (`make:elements`)

Comandos para regenerar cada módulo en `src/elements/`:

<!-- elements:start -->

### `cartaporte_31`

```sh
pnpm make:elements scripts/elements_maker/specifications/cartaporte_31.json src/elements/cartaporte_31/ --with-tests
```

### `cfdi_40`

```sh
pnpm make:elements scripts/elements_maker/specifications/cfdi_40.json src/elements/cfdi_40/ --with-tests
```

### `donat_11`

```sh
pnpm make:elements scripts/elements_maker/specifications/donat_11.json src/elements/donat_11/ --with-tests
```

### `implocal_10`

```sh
pnpm make:elements scripts/elements_maker/specifications/implocal_10.json src/elements/implocal_10/ --with-tests
```

### `leyendas_fisc_10`

```sh
pnpm make:elements scripts/elements_maker/specifications/leyendas_fisc_10.json src/elements/leyendas_fisc_10/ --with-tests
```

### `pago_20`

```sh
pnpm make:elements scripts/elements_maker/specifications/pago_20.json src/elements/pago_20/ --with-tests
```

### `plataformas_tecnologicas_10`

```sh
pnpm make:elements scripts/elements_maker/specifications/plataformas_tecnologicas_10.json src/elements/plataformas_tecnologicas_10/ --with-tests
```

### `tfd_11`

```sh
pnpm make:elements scripts/elements_maker/specifications/tfd_11.json src/elements/tfd_11/ --with-tests
```

### `cce_20`

```sh
pnpm make:elements scripts/elements_maker/specifications/cce_20.json src/elements/cce_20/ --with-tests
```

### `nomina_12`

```sh
pnpm make:elements scripts/elements_maker/specifications/nomina_12.json src/elements/nomina_12/ --with-tests
```

### `retenciones_20`

```sh
pnpm make:elements scripts/elements_maker/specifications/retenciones_20.json src/elements/retenciones_20/ --with-tests
```

### `notariospublicos_10`

```sh
pnpm make:elements scripts/elements_maker/specifications/notariospublicos_10.json src/elements/notariospublicos_10/ --with-tests
```

### `consumodecombustibles_11`

```sh
pnpm make:elements scripts/elements_maker/specifications/consumodecombustibles_11.json src/elements/consumodecombustibles_11/ --with-tests
```

### `dividendos_10`

```sh
pnpm make:elements scripts/elements_maker/specifications/dividendos_10.json src/elements/dividendos_10/ --with-tests
```

### `pagosaextranjeros_10`

```sh
pnpm make:elements scripts/elements_maker/specifications/pagosaextranjeros_10.json src/elements/pagosaextranjeros_10/ --with-tests
```

### `servicioparcial_10`

```sh
pnpm make:elements scripts/elements_maker/specifications/servicioparcial_10.json src/elements/servicioparcial_10/ --with-tests
```

### `iedu_10`

```sh
pnpm make:elements scripts/elements_maker/specifications/iedu_10.json src/elements/iedu_10/ --with-tests
```

### `ine_11`

```sh
pnpm make:elements scripts/elements_maker/specifications/ine_11.json src/elements/ine_11/ --with-tests
```

### `ventavehiculos_11`

```sh
pnpm make:elements scripts/elements_maker/specifications/ventavehiculos_11.json src/elements/ventavehiculos_11/ --with-tests
```

### `detallista`

```sh
pnpm make:elements scripts/elements_maker/specifications/detallista.json src/elements/detallista/ --with-tests
```

### `intereses_10`

```sh
pnpm make:elements scripts/elements_maker/specifications/intereses_10.json src/elements/intereses_10/ --with-tests
```

### `intereseshipotecarios_10`

```sh
pnpm make:elements scripts/elements_maker/specifications/intereseshipotecarios_10.json src/elements/intereseshipotecarios_10/ --with-tests
```

### `planesderetiro_11`

```sh
pnpm make:elements scripts/elements_maker/specifications/planesderetiro_11.json src/elements/planesderetiro_11/ --with-tests
```

### `enajenaciondeacciones_10`

```sh
pnpm make:elements scripts/elements_maker/specifications/enajenaciondeacciones_10.json src/elements/enajenaciondeacciones_10/ --with-tests
```

### `arrendamientoenfideicomiso_10`

```sh
pnpm make:elements scripts/elements_maker/specifications/arrendamientoenfideicomiso_10.json src/elements/arrendamientoenfideicomiso_10/ --with-tests
```

<!-- elements:end -->
