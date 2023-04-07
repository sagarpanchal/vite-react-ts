import { isDevEnv } from "./isDevEnv"

export function logError(...args: any[]): void {
  isDevEnv() && console.error(...args) // eslint-disable-line no-console
}
