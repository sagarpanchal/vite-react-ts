import { isNumber } from "./isNumber"
import { isString } from "./isString"

export function castToNumber<T>(input: unknown, altOutput?: T): T extends number ? number : number | undefined
export function castToNumber(input: any, altOutput = undefined): any {
  const output = isString(input) ? Number(`${input as string}`.replace(/[^0-9.+-]/g, "")) : Number(input)
  return isNumber(output) ? output : altOutput
}
