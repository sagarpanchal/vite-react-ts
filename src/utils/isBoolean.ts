import { typeOf } from "./typeOf"

export function isBoolean(input: unknown): input is boolean {
  return typeOf(input, "Boolean")
}
