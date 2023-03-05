import { isDevEnv } from "./isDevEnv"

export function runInDevelopment<T extends () => any>(callback: T): ReturnType<T> | boolean {
  return isDevEnv() && callback()
}
