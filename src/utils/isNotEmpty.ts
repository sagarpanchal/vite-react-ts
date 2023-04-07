import { isEmpty } from "./isEmpty"

export function isNotEmpty(...args: Parameters<typeof isEmpty>): boolean {
  return !isEmpty(...args)
}
