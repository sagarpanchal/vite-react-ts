import { logWarn } from "./logWarn"

export function keys<T extends { [k: string]: any }>(o: T): [keyof typeof o][] | string[] {
  try {
    return Object.keys(o)
  } catch (error) {
    logWarn(error)
    return []
  }
}
