import { isString } from "./isString"
import { LOCALE } from "./utils.constants"

export function upperCase(input: string, locale = LOCALE): string {
  if (!isString(input)) return ""
  return input.toLocaleUpperCase(locale)
}
