import { logWarn } from "./logWarn"

export function queryStringToObject(search = window.location.search): { [k: string]: string } {
  try {
    const urlParams = new URLSearchParams(search)
    return Object.fromEntries(urlParams.entries())
  } catch (error) {
    logWarn(error)
    return {}
  }
}
