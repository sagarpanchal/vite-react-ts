import { typeOf } from "./typeOf"

export function isBoolean(input: any): boolean {
  return typeOf(input, "Boolean")
}
