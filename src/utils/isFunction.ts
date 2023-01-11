import { typeOf } from "./typeOf"

export function isFunction(input: unknown): boolean {
  return typeOf(input, "Function")
}
