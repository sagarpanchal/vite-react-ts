import { isString } from "./isString"
import { LOCALE } from "./utils.constants"

export function lowerFirst(input: any, locale = LOCALE): string {
  if (!isString(input)) return ""
  return input.replace(/(^[a-z])/, (match: string) => match.toLocaleLowerCase(locale))
}
