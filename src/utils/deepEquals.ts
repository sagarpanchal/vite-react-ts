import { clone } from "./clone"
import { hasKey } from "./hasKey"
import { isArray } from "./isArray"
import { isFunction } from "./isFunction"
import { isObject } from "./isObject"
import { GenericObject } from "./types"

/**
 * Deep Compare two objects
 * @author Sagar Panchal <panchal.sagar@outlook.com>
 * @returns
 */
export function deepEquals(a: unknown, b: unknown): boolean {
  if (typeof a !== typeof b) return false

  if (isObject(a)) {
    const A = clone(a) as GenericObject
    const B = clone(b) as GenericObject

    Object.keys(A).forEach((key) => {
      if (typeof A[key] === "undefined") delete A[key]
    })

    Object.keys(B).forEach((key) => {
      if (typeof B[key] === "undefined") delete B[key]
    })

    if (Object.keys(A).length !== Object.keys(B).length) return false
    if (Object.keys(A).find((key) => !hasKey(B, key))) return false

    return Object.keys(A).reduce((equals, key) => {
      if (!equals) return false
      if (deepEquals(A[key], B[key])) return equals
      return false
    }, true)
  }

  if (isArray(a)) {
    const A = a as unknown[]
    const B = b as unknown[]

    if (A.length !== B.length) return false

    return A.reduce((equals, aItem) => {
      if (!equals) return false
      if (B.find((bItem) => deepEquals(aItem, bItem))) return true
      return false
    }, true) as boolean
  }

  // eslint-disable-next-line @typescript-eslint/unbound-method
  if (a?.constructor === Date || (isFunction(a?.valueOf) && isFunction(b?.valueOf))) {
    return a?.valueOf?.() === b?.valueOf?.()
  }

  return a === b
}
