import { isNumber } from "./isNumber"
import { FRACTION_LENGTH } from "./utils.constants"

export function parseDecimal(input: any, fractionLength = FRACTION_LENGTH): number | undefined {
  if (!isNumber(Number(input))) return undefined
  return Number(parseFloat(input).toFixed(fractionLength))
}
