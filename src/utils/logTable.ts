import { isDevEnv } from "./isDevEnv"

export function logTable(...args: any[]): void {
  isDevEnv() && console.table(...args) // eslint-disable-line no-console
}
