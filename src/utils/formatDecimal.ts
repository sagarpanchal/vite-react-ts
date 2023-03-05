import { formatNumber, FormatNumberOptions } from "./formatNumber"
import { isNumber } from "./isNumber"
import { FRACTION_LENGTH } from "./utils.constants"

export function formatDecimal(input: unknown, options: FormatNumberOptions = {}): ReturnType<typeof formatNumber> {
  options = (isNumber(options) ? { fractionLength: options } : options) as FormatNumberOptions
  return formatNumber(input, { fractionLength: FRACTION_LENGTH, ...options })
}
