import { generatePath } from "react-router-dom"

import { logWarn } from "./logWarn"

export function generateRoutePath(path: string, params = {}): string {
  try {
    return generatePath(path, params)
  } catch (error) {
    logWarn(error)
    return path.split(":")?.[0] ?? ""
  }
}
