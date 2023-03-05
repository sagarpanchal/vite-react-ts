import React from "react"

export function useCounter(init = 0) {
  const [count, set] = React.useState(init)

  const inc = React.useCallback((cb?: (n?: number) => unknown) => {
    set((n) => {
      n = n > 0 ? ++n : 1
      void cb?.(n)
      return n
    })
  }, [])

  const dec = React.useCallback((cb?: (n?: number) => unknown) => {
    set((n) => {
      n = n > 0 ? --n : 0
      void cb?.(n)
      return n
    })
  }, [])

  React.useDebugValue(count)
  return [count, inc, dec] as const
}
