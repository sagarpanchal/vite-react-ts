import { logWarn } from "./logWarn"

export function hasKey<T>(object: T, key: keyof T | PropertyKey): boolean {
  try {
    return Object.hasOwn(object as object, key)
  } catch (error) {
    logWarn(error)
    return false
  }
}
