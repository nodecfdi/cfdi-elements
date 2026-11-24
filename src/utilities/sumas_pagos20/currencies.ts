export default class Currencies {
  private readonly _currencyAllowedDecimals = new Map<string, number>();

  public constructor(currencyAllowedDecimals: Record<string, number>) {
    for (const [currency, decimals] of Object.entries(currencyAllowedDecimals)) {
      this._currencyAllowedDecimals.set(currency, Math.min(4, Math.max(0, Math.trunc(decimals))));
    }
  }

  public get(currency: string): number {
    return this._currencyAllowedDecimals.get(currency) ?? 2;
  }
}
