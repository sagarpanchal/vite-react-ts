import { uniq } from "lodash-es"

import { isArray } from "./isArray"
import { isEmpty } from "./isEmpty"
import { isString } from "./isString"

export interface FormatInlineListOptions {
  separator?: string
  returnString?: boolean
  removeDupes?: boolean
  allowAppend?: boolean
}

export function formatInlineList(list: string | string[], options: FormatInlineListOptions = {}): string | string[] {
  options = {
    separator: ",",
    returnString: true,
    removeDupes: true,
    allowAppend: false,
    ...options,
  } as FormatInlineListOptions

  if (isArray(list)) list = (list as string[]).join(options.separator)
  if (!isString(list)) return list

  let output = `${list as string}`.replace(/[\s,]+/gm, options.separator as string).split(options.separator as string)

  output = output.filter(
    (value, index) => !isEmpty(value) || (options.allowAppend && index && output?.length === index + 1),
  )

  options.removeDupes = options.allowAppend
    ? isEmpty(output[output.length - 1]) && options.removeDupes
    : options.removeDupes

  output = options.removeDupes ? uniq(output) : output
  return options.returnString ? output.join(options.separator) : output
}
