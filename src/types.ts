import type { Decimal } from '@nodecfdi/cfdi-core';
import type { XmlNodeInterface } from '@nodecfdi/cfdi-core/types';

export type SumaTraslados = Record<
  string,
  { Impuesto: string; TipoFactor: string; TasaOCuota: string; Importe: Decimal; Base: Decimal }
>;

export type SumaExentos = Record<string, { Impuesto: string; TipoFactor: string; Base: Decimal }>;

export type SumaRetenciones = Record<string, { Impuesto: string; Importe: Decimal }>;

export interface SumaLocal { Impuesto: string; Tasa: Decimal; Importe: Decimal }

export interface ElementInterface<TAttributes extends string = string>
  extends XmlNodeInterface<TAttributes> {
  getElementName: () => string;

  getFixedAttributes: () => Record<string, string>;

  getChildrenOrder: () => string[];
}
