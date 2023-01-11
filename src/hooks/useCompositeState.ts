import React from "react"

import { Immutable, produce } from "immer"

import { isObject, isFunction, isArray } from "utils"

export function useCompositeState<T>(
  initialState: T,
  replace = false,
): [T, React.Dispatch<React.SetStateAction<T>>, () => void] {
  const [state, _setState] = React.useState<T>(initialState)
  const initialStateRef = React.useRef(initialState)
  const replaceRef = React.useRef(replace)

  const setState = React.useCallback((objectOrCallback: React.SetStateAction<T>) => {
    const hasCallback = isFunction(objectOrCallback)
    const callback = (hasCallback ? objectOrCallback : undefined) as (prevState: T) => T
    const values = (!hasCallback ? objectOrCallback : undefined) as T
    const replace = replaceRef.current

    _setState((state) => {
      const input = callback ? produce(callback as (prevState: T) => T)(state as Immutable<T>) : values
      if (isArray(state)) return (replace ? input : [...(state as unknown[]), ...(input as unknown[])]) as T
      if (isObject(state)) return (replace ? input : { ...state, ...input }) as T
      return input as T
    })
  }, [])

  const resetState = React.useCallback(() => {
    _setState(initialStateRef.current)
  }, [])

  React.useDebugValue(state)
  return [state, setState, resetState]
}
