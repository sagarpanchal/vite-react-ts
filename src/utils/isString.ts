import { typeOf } from "./typeOf"

export function isString(input: unknown): input is string {
  return typeOf(input, "String")
}
