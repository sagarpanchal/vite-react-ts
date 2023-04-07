import { typeOf } from "./typeOf"

export function isFunction(input: unknown): input is (...args: unknown[]) => unknown {
  return typeOf(input, "Function")
}
