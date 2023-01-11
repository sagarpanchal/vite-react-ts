import { isString } from "./isString"
import { LOCALE } from "./utils.constants"

export function upperFirst(input: string, locale = LOCALE): string {
  if (!isString(input)) return ""
  return input.replace(/(^[a-z])/, (match) => match.toLocaleUpperCase(locale))
}
