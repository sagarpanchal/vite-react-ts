import { formatNumber, FormatNumberOptions } from "./formatNumber"
import { isNumber } from "./isNumber"
import { CURRENCY, FRACTION_LENGTH } from "./utils.constants"

export type FormatCurrencyOptions = FormatNumberOptions

export function formatCurrency(
  input: unknown,
  options: FormatCurrencyOptions | number = {},
): ReturnType<typeof formatNumber> {
  options = (isNumber(options) ? { fractionLength: options } : options) as FormatCurrencyOptions
  return formatNumber(input, { style: "currency", currency: CURRENCY, fractionLength: FRACTION_LENGTH, ...options })
}
