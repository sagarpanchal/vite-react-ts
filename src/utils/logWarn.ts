import { isDevEnv } from "./isDevEnv"

export function logWarn(...args: any[]): void {
  isDevEnv() && console.warn(...args) // eslint-disable-line no-console
}
