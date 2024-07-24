# Tools

En este espacio se encuentran algunas herramientas de desarrollo internas.

**Importante:** Estas herramientas no están diseñadas para trabajar fuera de esta librería ni se deben
incluir en el paquete distribuible.

## Comandos

Actualmente se incluyen dos comandos de ayuda para la creación automatica tanto de archivo base para una especificación de algún elemento. Y el otro comando para generar los elementos dado un archivo de especificación. Podras visualizar todos los comandos usando:

```sh
node ace list
```

### Comando `make:specification`

Este comando crea un archivo base vació de una especificacion

```sh
node ace make:specification <name> [<schema-location>]
```

### Comando `make:elements`

Este comando fabrica elementos usando un archivo de especificación.

```sh
node ace make:elements [options] [--] <specification-file> <output-directory>
```

Para un ejemplo del contenido del argumento `specification-file` se puede ver el archivo
`tools/elements_maker/specifications/cfdi_40.json`.

El argumento `output-directory` es donde se generarán los archivos de tipo `Element` de acuerdo a la especificación.

El siguiente es el ejemplo de cómo se crearon los elementos de `Cfdi40`.

```sh
rm -rf src/cfdi_40
node ace make:elements tools/elements_maker/specifications/cfdi_40.json src/cfdi_40/
```

Si require ver mas información acerca del comando puede usar la ayuda con el siguiente comando

```sh
node ace help make:elements
```
