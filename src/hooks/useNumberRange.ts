import React from "react"

import { catchError, isHTMLElement, isNumber, isNumeric, resolve } from "utils"

import { useAutoRef } from "./useAutoRef"

const getInput = (ref: any) => ref?.current?.inputRef?.input ?? ref?.current?.inputNumberRef?.input ?? ref?.current

export function useNumberRange(
  refA?: React.MutableRefObject<HTMLInputElement | any>,
  refB?: React.MutableRefObject<HTMLInputElement | any>,
): [
  {
    from: number | undefined
    to: number | undefined
    range: (number | undefined)[]
  },
  {
    from: (eventOrValue: React.FormEvent<HTMLInputElement> | string) => void
    to: (eventOrValue: React.FormEvent<HTMLInputElement> | string) => void
  },
  {
    from: (...args: any[]) => void
    to: (...args: any[]) => void
  },
  {
    from: React.Dispatch<any>
    to: React.Dispatch<any>
    clear: () => void
  },
]

export function useNumberRange(refA: any, refB: any) {
  const [valueA, setValueA] = React.useState(() => getInput(refA)?.value)
  const [valueB, setValueB] = React.useState(() => getInput(refB)?.value)

  const valuesRef = useAutoRef([valueA, valueB])

  const range = React.useMemo(() => {
    const list = [isNumber(valueA) ? valueA : undefined, isNumber(valueB) ? valueB : undefined]
    return isNumber(valueA) && isNumber(valueB) && valueB < valueA ? list.reverse() : list
  }, [valueA, valueB])

  const clear = React.useCallback(() => {
    setValueA(undefined)
    setValueB(undefined)

    catchError(() => {
      getInput(refA).value = ""
      getInput(refB).value = ""

      if (refA.current?.inputRef) refA.current.inputRef.rawInput = ""
      if (refB.current?.inputRef) refB.current.inputRef.rawInput = ""

      if (refA.current?.inputNumberRef) refA.current.inputNumberRef.rawInput = ""
      if (refB.current?.inputNumberRef) refB.current.inputNumberRef.rawInput = ""
    })
  }, [refA, refB])

  const swapIfNecessary = React.useCallback(() => {
    const [valueA, valueB] = valuesRef.current
    const inputA = getInput(refA)
    const inputB = getInput(refB)

    const allInputsAreInactive =
      isHTMLElement(inputA) && isHTMLElement(inputB)
        ? document.activeElement !== inputA && document.activeElement !== inputB
        : true
    if (!allInputsAreInactive) return

    const allValuesAreNumbers = isNumber(valueA) && isNumber(valueB)

    if (!allValuesAreNumbers) {
      if (!isNumber(valueA)) setValueA(undefined)
      if (!isNumber(valueB)) setValueB(undefined)
      return
    }

    const endIsLesserThanStart = valueB < valueA
    if (!endIsLesserThanStart) return

    void (setValueA(valueB), setValueB(valueA))
  }, [refA, refB, valuesRef])

  const handleAChange = React.useCallback((eventOrValue: React.FormEvent<HTMLInputElement> | string) => {
    const value = resolve(eventOrValue)
    if (isNumeric(value, false)) setValueA(value)
  }, [])

  const handleBChange = React.useCallback((eventOrValue: React.FormEvent<HTMLInputElement> | string) => {
    const value = resolve(eventOrValue)
    if (isNumeric(value, false)) setValueB(value)
  }, [])

  const handleABlur = React.useCallback(() => {
    setValueA((value: any) => (isNumber(value) ? value : undefined))
    setImmediate(() => swapIfNecessary())
  }, [swapIfNecessary])

  const handleBBlur = React.useCallback(() => {
    setValueB((value: any) => (isNumber(value) ? value : undefined))
    setImmediate(() => swapIfNecessary())
  }, [swapIfNecessary])

  React.useDebugValue({ from: valueA, to: valueB, range })

  return [
    { from: valueA, to: valueB, range },
    React.useMemo(() => ({ from: handleAChange, to: handleBChange }), [handleAChange, handleBChange]),
    React.useMemo(() => ({ from: handleABlur, to: handleBBlur }), [handleABlur, handleBBlur]),
    React.useMemo(() => ({ from: setValueA, to: setValueB, clear }), [clear]),
  ]
}
