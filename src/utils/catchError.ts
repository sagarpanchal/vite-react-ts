import { logWarn } from "./logWarn"

type Callback<T> = (...args: any[]) => T
type ErrorCallback<T> = (error?: any) => T

export function catchError<FR>(
  func: Callback<FR>,
): FR extends Promise<any> ? Promise<Awaited<FR> | undefined> : FR | undefined

export function catchError<FR, ER>(
  func: Callback<FR>,
  onError?: ErrorCallback<ER>,
): FR extends Promise<any>
  ? Promise<Awaited<FR> | (typeof onError extends undefined ? undefined : ER)>
  : FR | (typeof onError extends undefined ? undefined : ER)

export function catchError(func: any, onError = (e: any) => e): any {
  const handleError = (error: any) => {
    logWarn(error)
    return onError?.(error)
  }

  try {
    const output = func?.()
    if (output?.constructor?.name !== "Promise") return output
    return output?.catch?.(handleError)
  } catch (error) {
    return handleError(error)
  }
}
