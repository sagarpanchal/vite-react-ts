import { isArray } from "./isArray"
import { isEmpty } from "./isEmpty"
import { isNumber } from "./isNumber"

export function reduceTotal<T>(list: T[], key: keyof T): number {
  if (!isArray(list) || isEmpty(list)) return 0
  const numList = key === undefined ? list.map(Number) : list.map((item: any) => Number(item?.[key]))
  return numList.filter(isNumber).reduce((pv, cv) => (pv += cv), 0)
}
