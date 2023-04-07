import React from "react"

export function useList<T>(list: T[] = [], count = 0) {
  const [state, _setState] = React.useState({ list, count })

  const setList = React.useCallback((list?: T[], count?: number): void => {
    _setState((state) => ({
      list: list ?? state.list,
      count: count ?? state.count,
    }))
  }, [])

  const resetList = React.useCallback((): void => {
    _setState(() => ({ list: [], count: 0 }))
  }, [])

  React.useDebugValue(state)

  return [state?.list, state?.count, setList, resetList] as const
}
