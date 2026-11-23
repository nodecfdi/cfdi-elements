# Scripts

En este espacio se encuentran las herramientas de desarrollo internas para generación de código.

**Importante:** Estas herramientas no están diseñadas para trabajar fuera de esta librería ni se deben
incluir en el paquete distribuible.

## Comandos

Actualmente se incluyen dos scripts de ayuda ejecutados con `tsx`: uno para crear el archivo base de
una especificación y otro para generar los elementos a partir de una especificación.

### Script `make:specification`

Este script crea un archivo base vacío de una especificación:

```sh
pnpm make:specification <name> [<schema-location>]
```

### Script `make:elements`

Este script fabrica elementos usando un archivo de especificación:

```sh
pnpm make:elements [options] <specification-file> <output-directory>
```

Para un ejemplo del contenido del argumento `specification-file` se puede ver el archivo
`scripts/elements_maker/specifications/cfdi_40.json`.

El argumento `output-directory` es donde se generarán los archivos de tipo `Element` de acuerdo a la especificación.

El siguiente es el ejemplo de cómo se crearon los elementos de `Cfdi40`:

```sh
rm -rf src/cfdi_40
pnpm make:elements scripts/elements_maker/specifications/cfdi_40.json src/cfdi_40/
```

Para omitir el formateo automático con ESLint se puede pasar `--no-beautify`. Para ver la ayuda de cualquier comando:

```sh
pnpm make:elements --help
pnpm make:specification --help
```
