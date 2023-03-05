import { isNumber } from "./isNumber"
import { FRACTION_LENGTH } from "./utils.constants"

export function formatFloat(input: unknown, fractionLength = FRACTION_LENGTH): string | undefined {
  if (!isNumber(Number(input))) return undefined
  return parseFloat(input as string).toFixed(fractionLength)
}
