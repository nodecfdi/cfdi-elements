import { type XmlNodeInterface } from '@nodecfdi/cfdi-core/types';

export type SumaTraslados = Record<
  string,
  { Impuesto: string; TipoFactor: string; TasaOCuota: string; Importe: number; Base: number }
>;

export type SumaExentos = Record<string, { Impuesto: string; TipoFactor: string; Base: number }>;

export type SumaRetenciones = Record<string, { Impuesto: string; Importe: number }>;

export type SumaLocal = { Impuesto: string; Tasa: number; Importe: number };

export interface ElementInterface extends XmlNodeInterface {
  getElementName(): string;

  getFixedAttributes(): Record<string, string>;

  getChildrenOrder(): string[];
}
