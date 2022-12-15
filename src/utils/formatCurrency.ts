import { formatNumber, formatNumberOptions } from "./formatNumber"
import { isNumber } from "./isNumber"
import { CURRENCY, FRACTION_LENGTH } from "./utils.constants"

export type formatCurrencyOptions = formatNumberOptions

export function formatCurrency(
  input: unknown,
  options: formatCurrencyOptions | number = {},
): ReturnType<typeof formatNumber> {
  options = (isNumber(options) ? { fractionLength: options } : options) as formatCurrencyOptions
  return formatNumber(input, { style: "currency", currency: CURRENCY, fractionLength: FRACTION_LENGTH, ...options })
}
