import { isString } from "./isString"
import { LOCALE } from "./utils.constants"

export function lowerCase(input: any, locale = LOCALE): string {
  if (!isString(input)) return ""
  return input.toLocaleLowerCase(locale)
}
