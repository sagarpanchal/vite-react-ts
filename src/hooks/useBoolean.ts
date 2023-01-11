import React from "react"

interface useBooleanSetter {
  true: () => void
  false: () => void
  toggle: () => void
}

export function useBoolean(initialValue: boolean | (() => boolean) = false): [boolean, useBooleanSetter] {
  const [state, _setState] = React.useState(Boolean(initialValue))

  const setState = React.useMemo(() => {
    return {
      true: () => _setState(true),
      false: () => _setState(false),
      toggle: () => _setState((v) => !v),
    }
  }, [])

  React.useDebugValue(state)
  return [state, setState]
}
