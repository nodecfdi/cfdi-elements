# Scripts

En este espacio se encuentran las herramientas de desarrollo internas para generación de código.

**Importante:** Estas herramientas no están diseñadas para trabajar fuera de esta librería ni se deben
incluir en el paquete distribuible.

## Comandos

Actualmente se incluyen dos scripts de ayuda ejecutados con `tsx`: uno para crear o actualizar el archivo
de especificación (incluyendo extracción de estructura y atributos desde el XSD) y otro para generar los
elementos tipados a partir de una especificación.

### Script `make:specification`

Crea o actualiza un archivo de especificación JSON. Permite poblar automáticamente la estructura y los
atributos desde `xml-schemalocation` (o un archivo XSD local) y declarar `shortcuts`, `methodName`,
`rename` y `singleAddChild` directamente desde CLI:

```sh
pnpm make:specification [opciones] <name> [<schema-location>]
```

Ejemplo completo para generar `cfdi_40.json` desde el XSD sin editar JSON manualmente:

```sh
pnpm make:specification Cfdi40 https://www.sat.gob.mx/sitio_internet/cfd/4/cfdv40.xsd \
  --prefix cfdi \
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

### Script `make:elements`

Este script fabrica elementos usando un archivo de especificación:

```sh
pnpm make:elements [opciones] <specification-file> <output-directory>
```

Con `--sync-xsd` (o `--xsd <archivo-o-url>`) actualiza primero `"attributes"` en el archivo de
especificación a partir del XSD y luego genera las clases con tipos `*Attributes` y `AttributesRecord`:

```sh
pnpm make:elements --sync-xsd scripts/elements_maker/specifications/cfdi_40.json src/cfdi_40/
```

Para omitir el formateo automático con ESLint se puede pasar `--no-beautify`. Para ver la ayuda de cualquier comando:

```sh
pnpm make:elements --help
pnpm make:specification --help
```
