import React from "react"

type TCallback = (n?: number) => any
type TCallbackCallback = (cb: TCallback) => void

export function useCounter(init = 0): [number, TCallbackCallback, TCallbackCallback] {
  const [count, set] = React.useState(init)

  const inc = React.useCallback((cb: TCallback = () => undefined) => set((n) => ((n = n > 0 ? ++n : 1), cb(n), n)), [])
  const dec = React.useCallback((cb: TCallback = () => undefined) => set((n) => ((n = n > 0 ? --n : 0), cb(n), n)), [])

  React.useDebugValue(count)
  return [count, inc, dec]
}
