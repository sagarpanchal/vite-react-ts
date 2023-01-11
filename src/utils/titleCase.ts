import { isString } from "./isString"
import { LOCALE } from "./utils.constants"

export function titleCase(input: string, locale = LOCALE): string {
  if (!isString(input)) return ""
  const list = input.split(/([ :–—-])/)
  const words = list.map((current, index, list) => {
    return (
      // Check for small words
      current.search(/^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|v.?|vs.?|via)$/i) > -1 &&
        // Skip first and last word
        index !== 0 &&
        index !== list.length - 1 &&
        // Ignore title end and subtitle start
        list[index - 3] !== ":" &&
        list[index + 1] !== ":" &&
        // Ignore small words that start a hyphenated phrase
        (list[index + 1] !== "-" || (list[index - 1] === "-" && list[index + 1] === "-"))
        ? current.toLocaleLowerCase(locale)
        : current.substr(1).search(/[A-Z]|\../) > -1 // Ignore intentional capitalization
        ? current
        : list[index + 1] === ":" && list[index + 2] !== "" // Ignore URLs
        ? current
        : current.replace(/([A-Za-z0-9\u00C0-\u00FF])/, (match) => match.toLocaleUpperCase(locale)) // Capitalize the first letter
    )
  })
  return words.join("")
}
