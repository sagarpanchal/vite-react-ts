import { logWarn } from "./logWarn"

type TCallBack<T> = (...args: any[]) => T
type TCallBackError<T> = (error?: any) => T

export function catchError<FR, ER>(
  func: TCallBack<FR>,
  onError?: TCallBackError<ER>,
): FR | (ER extends unknown ? FR : ER)

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
