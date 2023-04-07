import { isEmpty } from "./isEmpty"
import { isFunction } from "./isFunction"
import { logWarn } from "./logWarn"

export function objectToQueryString(object: { [k: string]: any }): string {
  try {
    return `?${Object.entries(object)
      .map(
        ([key, value]) =>
          `${key}=${!isEmpty(value) && isFunction(value?.toString) ? (value.toString() as string) : ""}`,
      )
      .join("&")}`
  } catch (error) {
    logWarn(error)
    return ""
  }
}
