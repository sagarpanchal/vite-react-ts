import React from "react"

export function useCounter(init = 0) {
  const [count, set] = React.useState(init)

  const inc = React.useCallback(() => set((n) => (n > 0 ? ++n : 1)), [])
  const dec = React.useCallback(() => set((n) => (n > 0 ? --n : 0)), [])

  React.useDebugValue(count)
  return [count, inc, dec] as const
}
