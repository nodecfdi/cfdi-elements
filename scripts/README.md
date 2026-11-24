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
pnpm make:specification http://www.sat.gob.mx/sitio_internet/cfd/CartaPorte/CartaPorte31.xsd
```

### `cfdi_40`

```sh
pnpm make:specification https://www.sat.gob.mx/sitio_internet/cfd/4/cfdv40.xsd \
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

### `pago_20`

```sh
pnpm make:elements scripts/elements_maker/specifications/pago_20.json src/pago_20/
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
