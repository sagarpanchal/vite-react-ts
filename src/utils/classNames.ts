import { isString } from "./isString"

export function classNames(...list: any[]): string {
  return list.filter(isString).join(" ")
}
