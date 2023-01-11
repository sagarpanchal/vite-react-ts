import { typeOf } from "./typeOf"

export function isObject(input: any): boolean {
  return typeOf(input, "Object")
}
