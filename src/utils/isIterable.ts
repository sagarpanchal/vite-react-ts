import { isFunction } from "./isFunction"

export function isIterable(input: any): boolean {
  return isFunction(input?.[Symbol.iterator])
}
