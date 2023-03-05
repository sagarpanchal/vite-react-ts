import { typeOf } from "./typeOf"

export function isNumber(input: unknown): input is number {
  return typeOf(input, "Number") && !Number.isNaN(input) && Number.isFinite(input)
}
