# Scripts

En este espacio se encuentran las herramientas de desarrollo internas para generación de código.

**Importante:** Estas herramientas no están diseñadas para trabajar fuera de esta librería ni se deben
incluir en el paquete distribuible.

## Comandos

Actualmente se incluyen dos scripts de ayuda ejecutados con `tsx`: uno para crear o actualizar el archivo
de especificación (incluyendo extracción de estructura y atributos desde el XSD) y otro para generar los
elementos tipados (junto con su `index.ts`) a partir de una especificación.

Al ejecutar cualquiera de los dos comandos sobre una especificación o módulo nuevo, su comando se registra
automáticamente en las secciones correspondientes al final de este documento si aún no existe.

### Script `make:specification`

Crea o actualiza un archivo de especificación JSON con el esquema `root` / `children`. Permite poblar
automáticamente la estructura y los atributos desde `xml-schemalocation` (o un archivo XSD local) y
declarar `shortcuts`, `methodName`, `rename` y `singleAddChild` directamente desde CLI:

```sh
pnpm make:specification [opciones] <name> [<schema-location>]
```

### Script `make:elements`

Fabrica las clases de elementos tipados y su `index.ts` a partir de un archivo de especificación:

```sh
pnpm make:elements [opciones] <specification-file> <output-directory>
```

Con `--sync-xsd` (o `--xsd <archivo-o-url>`) actualiza primero `"attributes"` en el archivo de
especificación a partir del XSD y luego genera las clases con tipos `*Attributes` y `AttributesRecord`.
Para omitir el formateo automático con ESLint se puede pasar `--no-beautify`. Para ver la ayuda:

```sh
pnpm make:elements --help
pnpm make:specification --help
```

---

## Comandos de Especificaciones (`make:specification`)

Comandos exactos para reproducir cada especificación en `scripts/elements_maker/specifications/`:

<!-- specifications:start -->

### `cartaporte_31`

```sh
pnpm make:specification CartaPorte31 http://www.sat.gob.mx/sitio_internet/cfd/CartaPorte/CartaPorte31.xsd \
  --prefix cartaporte31 \
  --xml-namespace http://www.sat.gob.mx/CartaPorte31 \
  --version-attribute Version \
  --version-value 3.1 \
  --sync-xsd \
  --rename Mercancias.TransporteMaritimo.Contenedor=ContenedorMaritimo \
  --rename Mercancias.TransporteFerroviario.Carro.Contenedor=ContenedorFerroviario
```

### `cfdi_40`

```sh
pnpm make:specification Cfdi40 https://www.sat.gob.mx/sitio_internet/cfd/4/cfdv40.xsd \
  --prefix cfdi \
  --xml-namespace https://www.sat.gob.mx/cfd/4 \
  --version-attribute Version \
  --version-value 4.0 \
  --sync-xsd \
  --rename Conceptos.Concepto.Impuestos=ConceptoImpuestos:Impuestos \
  --single-add-child Conceptos.Concepto.ComplementoConcepto \
  --single-add-child Complemento \
  --single-add-child Addenda \
  --shortcut :Conceptos->Concepto:single \
  --shortcut :Impuestos.Traslados->Traslado \
  --shortcut :Impuestos.Retenciones->Retencion \
  --shortcut Conceptos.Concepto:Impuestos.Traslados->Traslado \
  --shortcut Conceptos.Concepto:Impuestos.Retenciones->Retencion
```

### `donat_11`

```sh
pnpm make:specification Donat11 http://www.sat.gob.mx/sitio_internet/cfd/donat/donat11.xsd \
  --prefix donat \
  --xml-namespace http://www.sat.gob.mx/donat \
  --version-attribute version \
  --version-value 1.1 \
  --sync-xsd
```

### `implocal_10`

```sh
pnpm make:specification Implocal10 http://www.sat.gob.mx/sitio_internet/cfd/implocal/implocal.xsd \
  --prefix implocal \
  --xml-namespace http://www.sat.gob.mx/implocal \
  --version-attribute version \
  --version-value 1.0 \
  --sync-xsd
```

### `leyendas_fisc_10`

```sh
pnpm make:specification LeyendasFisc10 http://www.sat.gob.mx/sitio_internet/cfd/leyendasFiscales/leyendasFisc.xsd \
  --prefix leyendasFisc \
  --xml-namespace http://www.sat.gob.mx/leyendasFiscales \
  --version-attribute version \
  --version-value 1.0 \
  --sync-xsd
```

### `pagos_20`

```sh
pnpm make:specification Pagos20 http://www.sat.gob.mx/sitio_internet/cfd/Pagos/Pagos20.xsd \
  --prefix pago20 \
  --xml-namespace http://www.sat.gob.mx/Pagos20 \
  --version-attribute Version \
  --version-value 2.0 \
  --sync-xsd
```

### `plataformas_tecnologicas_10`

```sh
pnpm make:specification PlataformasTecnologicas10 http://www.sat.gob.mx/esquemas/retencionpago/1/PlataformasTecnologicas10/ServiciosPlataformasTecnologicas10.xsd \
  --prefix plataformasTecnologicas \
  --xml-namespace http://www.sat.gob.mx/esquemas/retencionpago/1/PlataformasTecnologicas10 \
  --version-attribute Version \
  --version-value 1.0 \
  --sync-xsd
```

### `tfd_11`

```sh
pnpm make:specification Tfd11 http://www.sat.gob.mx/sitio_internet/cfd/TimbreFiscalDigital/TimbreFiscalDigitalv11.xsd \
  --prefix tfd \
  --xml-namespace http://www.sat.gob.mx/TimbreFiscalDigital \
  --version-attribute Version \
  --version-value 1.1 \
  --sync-xsd
```

<!-- specifications:end -->

---

## Comandos de Generación de Elementos (`make:elements`)

Comandos para regenerar cada módulo en `src/`:

<!-- elements:start -->

### `cartaporte_31`

```sh
pnpm make:elements scripts/elements_maker/specifications/cartaporte_31.json src/cartaporte_31/
```

### `cfdi_40`

```sh
pnpm make:elements scripts/elements_maker/specifications/cfdi_40.json src/cfdi_40/
```

### `donat_11`

```sh
pnpm make:elements scripts/elements_maker/specifications/donat_11.json src/donat_11/
```

### `implocal_10`

```sh
pnpm make:elements scripts/elements_maker/specifications/implocal_10.json src/implocal_10/
```

### `leyendas_fisc_10`

```sh
pnpm make:elements scripts/elements_maker/specifications/leyendas_fisc_10.json src/leyendas_fisc_10/
```

### `pagos_20`

```sh
pnpm make:elements scripts/elements_maker/specifications/pagos_20.json src/pago_20/
```

### `plataformas_tecnologicas_10`

```sh
pnpm make:elements scripts/elements_maker/specifications/plataformas_tecnologicas_10.json src/plataformas_tecnologicas_10/
```

### `tfd_11`

```sh
pnpm make:elements scripts/elements_maker/specifications/tfd_11.json src/tfd_11/
```

<!-- elements:end -->
