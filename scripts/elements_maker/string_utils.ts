export function toSnakeCase(value: string): string {
  return value
    .replaceAll(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replaceAll(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
    .replaceAll(/([a-z])(\d)/gi, '$1_$2')
    .replaceAll(/(\d)([a-z])/gi, '$1_$2')
    .replaceAll(/[\s-]+/g, '_')
    .replaceAll(/^_+|_+$/g, '')
    .toLowerCase();
}

export function toWords(value: string): string {
  return toSnakeCase(value).replaceAll('_', ' ');
}

export function snakeToCamelCase(value: string): string {
  return value.replaceAll(/_([a-z0-9])/gi, (_, char: string) => char.toUpperCase());
}
