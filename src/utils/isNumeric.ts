import { REGEX } from "./utils.constants"

export function isNumeric(input: any, strict = true) {
  return new RegExp(strict ? REGEX.NUMERIC.STRICT : REGEX.NUMERIC.LOOSE).test(input)
}
