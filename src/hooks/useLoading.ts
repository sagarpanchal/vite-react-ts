import React from "react"

import { LoaderService } from "services/loader.service"

import { isNumber } from "utils"

import { useCounter } from "./useCounter"

export function useLoading(show = false) {
  const [count, inc, dec] = useCounter(0)
  const countRef = React.useRef(count)
  const showRef = React.useRef(show)

  React.useEffect(() => void (countRef.current = count), [count])

  const start = React.useCallback(() => {
    inc()
    showRef.current && LoaderService.startLoading()
  }, [inc])

  const stop = React.useCallback(() => {
    dec()
    showRef.current && LoaderService.stopLoading()
  }, [dec])

  React.useEffect(() => {
    const hasClass = document?.body?.classList?.contains?.("cursor-progress")

    void (count > 0
      ? !hasClass && document?.body?.classList?.add?.("cursor-progress")
      : hasClass && document?.body?.classList?.remove?.("cursor-progress"))
  }, [count])

  React.useEffect(() => {
    const show = showRef.current

    return () => {
      if (show && isNumber(countRef.current) && countRef.current > 0) {
        LoaderService.adjustCount(-Math.abs(countRef.current))
      }
    }
  }, [])

  React.useDebugValue(count)
  return [Boolean(count), start, stop] as const
}
