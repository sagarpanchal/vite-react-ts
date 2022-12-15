import { typeOf } from "./typeOf"

export function isNumber(input: any): boolean {
  return typeOf(input, "Number") && !Number.isNaN(input) && Number.isFinite(input)
}
