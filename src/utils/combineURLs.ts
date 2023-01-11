import { isEmpty } from "./isEmpty"

/**
 * Combine url parts
 * @param  {array} args  array or strings (partial urls)
 * @returns
 */
export function combineURLs(...args: string[]): string

export function combineURLs(...args: any[]): any {
  return args
    .filter((str) => !isEmpty(str))
    .join("/")
    .replace(/([^:]\/)\/+/g, "$1")
}
