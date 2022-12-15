import { typeOf } from "./typeOf"

export function isArray(input: any): boolean {
  return typeOf(input, "Array")
}
