import { catchError } from "./catchError"
import { clone } from "./clone"
import { isArray } from "./isArray"
import { isEmpty, IsEmptyOptions } from "./isEmpty"
import { isObject } from "./isObject"

interface PruneEmptyOptions extends IsEmptyOptions {
  clone?: boolean
}

/**
 * Prune refs with empty values
 * @author Sagar Panchal <panchal.sagar@outlook.com>
 * @param {*} input value
 * @param {*} options options
 * @returns {boolean}
 */
export function pruneEmpty<T>(input: T, options?: PruneEmptyOptions): T | undefined
export function pruneEmpty(input: any, options: any = {}): any {
  options = { clone: true, ...options }
  input = options.clone ? clone(input) : input

  const prune = (current: any) => {
    current = catchError(() => {
      if (isArray(current)) {
        for (let index = current.length; index > -1; index--) {
          if (isEmpty(prune(current[index]), options)) current.splice(index, 1)
        }
      }

      if (isObject(current)) {
        for (const prop in current) {
          if (isEmpty(prune(current[prop]), options)) delete current[prop]
        }
      }

      if (!isEmpty(current, options)) return current
    })

    return current
  }

  return prune(input)
}
