import React from "react"

import { useAutoRef } from "./useAutoRef"
import { useBitFlipState } from "./useBitFlipState"

export function useBitFlipStateWithStaticGetter(getter: (...a: any[]) => any, testInterval = 1000) {
  const [isRunning, setIsRunning] = React.useState(getter)
  const getterRef = useAutoRef(getter)

  React.useEffect(() => {
    const intervalId = setInterval(() => setIsRunning(getterRef.current()), testInterval)
    return () => clearInterval(intervalId)
  }, [getterRef, testInterval])

  return useBitFlipState(Boolean(isRunning))
}
