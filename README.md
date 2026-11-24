# `@nodecfdi/cfdi-elements`

[![Source Code][badge-source]][source]
[![Npm Node Version Support][badge-node-version]][node-version]
[![Discord][badge-discord]][discord]
[![Latest Version][badge-release]][release]
[![Software License][badge-license]][license]
[![Build Status][badge-build]][build]
[![Reliability][badge-reliability]][reliability]
[![Maintainability][badge-maintainability]][maintainability]
[![Code Coverage][badge-coverage]][coverage]
[![Violations][badge-violations]][violations]
[![Total Downloads][badge-downloads]][downloads]

:us: The documentation of this project is in spanish as this is the natural language for intended audience.

:mexico: La documentación del proyecto está en español porque ese es el lenguaje principal de los usuarios.

## Acerca de `@nodecfdi/cfdi-elements`

Librería de elementos y/o estructuras de datos que componen un cfdi.

Librería inspirada por la versión para php https://github.com/eclipxe13/CfdiUtils modularizada.

## Inicio rápido

```bash
pnpm add @nodecfdi/cfdi-elements @nodecfdi/cfdi-core
```

```ts
import { nodeToXmlString } from '@nodecfdi/cfdi-core';
import { SumasConceptos, SumasConceptosWriter } from '@nodecfdi/cfdi-elements';
import { Comprobante } from '@nodecfdi/cfdi-elements/cfdi40';

const comprobante = new Comprobante({ Serie: 'A', Folio: '1', TipoDeComprobante: 'I', Moneda: 'MXN' });
comprobante.addEmisor({ Rfc: 'EKU9003173C9', Nombre: 'EMISOR', RegimenFiscal: '601' });
comprobante.addReceptor({ Rfc: 'URE180429TM6', Nombre: 'RECEPTOR', DomicilioFiscalReceptor: '65000', RegimenFiscalReceptor: '601', UsoCFDI: 'G03' });
comprobante.addConcepto({ ClaveProdServ: '84111506', Cantidad: '1', ClaveUnidad: 'E48', Descripcion: 'Servicio', ValorUnitario: '100.00', Importe: '100.00', ObjetoImp: '02' })
  .addTraslado({ Base: '100.00', Impuesto: '002', TipoFactor: 'Tasa', TasaOCuota: '0.160000', Importe: '16.00' });

new SumasConceptosWriter(comprobante, new SumasConceptos(comprobante, 2), 2).put();
console.log(nodeToXmlString(comprobante, true));
```

## Documentación

La documentación está disponible en el sitio web [NodeCfdi](https://nodecfdi.com/packages/cfdi-elements/getting-started/)

## Soporte

Puedes obtener soporte abriendo un ticket en Github.

## Compatibilidad

Esta librería se mantendrá compatible con al menos la versión con
[soporte activo de Node](https://nodejs.org/es/about/releases/) más reciente.

También utilizamos [Versionado Semántico 2.0.0](https://semver.org/lang/es/) por lo que puedes usar esta librería sin temor a romper tu aplicación.

## Contribuciones

Las contribuciones con bienvenidas. Por favor lee [CONTRIBUTING][] para más detalles y recuerda revisar el archivo [CHANGELOG][].

## Copyright and License

The `@nodecfdi/cfdi-elements` library is copyright © [NodeCfdi](https://github.com/nodecfdi) and licensed for use under the MIT License (MIT). Please see [LICENSE][] for more information.

[contributing]: https://github.com/nodecfdi/.github/blob/main/docs/CONTRIBUTING.md
[changelog]: https://github.com/nodecfdi/cfdi-elements/blob/main/CHANGELOG.md
[source]: https://github.com/nodecfdi/cfdi-elements
[node-version]: https://www.npmjs.com/package/@nodecfdi/cfdi-elements
[discord]: https://discord.gg/AsqX8fkW2k
[release]: https://www.npmjs.com/package/@nodecfdi/cfdi-elements
[license]: https://github.com/nodecfdi/cfdi-elements/blob/main/LICENSE
[build]: https://github.com/nodecfdi/cfdi-elements/actions/workflows/build.yml?query=branch:main
[reliability]: https://sonarcloud.io/component_measures?id=nodecfdi_cfdi-elements&metric=Reliability
[maintainability]: https://sonarcloud.io/component_measures?id=nodecfdi_cfdi-elements&metric=Maintainability
[coverage]: https://sonarcloud.io/component_measures?id=nodecfdi_cfdi-elements&metric=Coverage
[violations]: https://sonarcloud.io/project/issues?id=nodecfdi_cfdi-elements&resolved=false
[downloads]: https://www.npmjs.com/package/@nodecfdi/cfdi-elements
[badge-source]: https://img.shields.io/badge/source-nodecfdi/cfdi--elements-blue.svg?logo=github
[badge-node-version]: https://img.shields.io/node/v/@nodecfdi/cfdi-elements.svg?logo=nodedotjs
[badge-discord]: https://img.shields.io/discord/459860554090283019?logo=discord
[badge-release]: https://img.shields.io/npm/v/@nodecfdi/cfdi-elements.svg?logo=npm
[badge-license]: https://img.shields.io/github/license/nodecfdi/cfdi-elements.svg?logo=open-source-initiative
[badge-build]: https://img.shields.io/github/actions/workflow/status/nodecfdi/cfdi-elements/build.yml?branch=main
[badge-reliability]: https://sonarcloud.io/api/project_badges/measure?project=nodecfdi_cfdi-elements&metric=reliability_rating
[badge-maintainability]: https://sonarcloud.io/api/project_badges/measure?project=nodecfdi_cfdi-elements&metric=sqale_rating
[badge-coverage]: https://img.shields.io/sonar/coverage/nodecfdi_cfdi-elements/main?logo=sonarcloud&server=https%3A%2F%2Fsonarcloud.io
[badge-violations]: https://img.shields.io/sonar/violations/nodecfdi_cfdi-elements/main?format=long&logo=sonarcloud&server=https%3A%2F%2Fsonarcloud.io
[badge-downloads]: https://img.shields.io/npm/dm/@nodecfdi/cfdi-elements.svg?logo=npm
