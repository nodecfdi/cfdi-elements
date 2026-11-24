import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: {
    index: 'index.ts',
    types: 'src/types.ts',
    tfd11: 'src/tfd_11/index.ts',
    cfdi40: 'src/cfdi_40/index.ts',
    pago20: 'src/pago_20/index.ts',
    implocal10: 'src/implocal_10/index.ts',
    donat11: 'src/donat_11/index.ts',
    leyendasFisc10: 'src/leyendas_fisc_10/index.ts',
    plataformasTecnologicas10: 'src/plataformas_tecnologicas_10/index.ts',
    cartaporte31: 'src/cartaporte_31/index.ts',
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
