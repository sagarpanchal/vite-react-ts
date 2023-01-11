import { isEmpty } from "./isEmpty"

export function getNonEmpty<V>(func: (input: any) => boolean, ...values: V[] | any[]): V {
  return values.find((v) => func(v) && !isEmpty(v)) as V
}
