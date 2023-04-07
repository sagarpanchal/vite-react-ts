import { isDevEnv } from "./isDevEnv"

export function logInfo(...args: any[]): void {
  isDevEnv() && console.info(...args) // eslint-disable-line no-console
}
