import React from "react"

export function useBoolean(initialValue: boolean | (() => boolean) = false) {
  const [state, _setState] = React.useState(Boolean(initialValue))

  const setState = React.useMemo(() => {
    return {
      true: () => _setState(true),
      false: () => _setState(false),
      toggle: () => _setState((v) => !v),
    } as const
  }, [])

  React.useDebugValue(state)
  return [state, setState] as const
}
