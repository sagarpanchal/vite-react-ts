import { formatNumber, formatNumberOptions } from "./formatNumber"
import { isNumber } from "./isNumber"
import { FRACTION_LENGTH } from "./utils.constants"

export function formatDecimal(input: unknown, options: formatNumberOptions = {}): ReturnType<typeof formatNumber> {
  options = (isNumber(options) ? { fractionLength: options } : options) as formatNumberOptions
  return formatNumber(input, { fractionLength: FRACTION_LENGTH, ...options })
}
