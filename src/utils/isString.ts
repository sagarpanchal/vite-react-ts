import { typeOf } from "./typeOf"

export function isString(input: any): boolean {
  return typeOf(input, "String")
}
