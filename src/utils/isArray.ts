import { typeOf } from "./typeOf"

export function isArray<T = unknown>(input: unknown | T[]): input is T[] {
  return typeOf(input, "Array")
}
