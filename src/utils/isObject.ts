import { typeOf } from "./typeOf"
import { GenericObject } from "./types"

export function isObject<T extends GenericObject>(input: T | unknown): input is T {
  return typeOf(input, "Object")
}
