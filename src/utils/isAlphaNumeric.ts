import { REGEX } from "./utils.constants"

export function isAlphaNumeric(input: any, strict = false): boolean {
  return new RegExp(strict ? REGEX.ALPHA_NUMERIC.STRICT : REGEX.ALPHA_NUMERIC.LOOSE).test(input)
}
