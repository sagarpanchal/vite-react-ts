import { logWarn } from "./logWarn"

export function values<T>(input: { [s: string]: T } | ArrayLike<T>): T[] {
  try {
    return Object.values(input)
  } catch (error) {
    logWarn(error)
    return []
  }
}
