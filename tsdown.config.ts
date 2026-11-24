import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: {
    index: 'index.ts',
    types: 'src/types.ts',
    tfd11: 'src/elements/tfd_11/index.ts',
    cfdi40: 'src/elements/cfdi_40/index.ts',
    pago20: 'src/elements/pago_20/index.ts',
    implocal10: 'src/elements/implocal_10/index.ts',
    donat11: 'src/elements/donat_11/index.ts',
    leyendasFisc10: 'src/elements/leyendas_fisc_10/index.ts',
    plataformasTecnologicas10: 'src/elements/plataformas_tecnologicas_10/index.ts',
    cartaporte31: 'src/elements/cartaporte_31/index.ts',
  },
  clean: true,
  format: 'esm',
  unbundle: true,
  minify: 'dce-only',
  fixedExtension: false,
  dts: true,
  platform: 'neutral',
  deps: {
    neverBundle: [/^node:/],
  },
  target: 'esnext',
  exports: true,
});
