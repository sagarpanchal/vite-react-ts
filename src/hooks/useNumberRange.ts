import React from "react"

import { catchError, isHTMLElement, isNumber, isNumeric } from "utils"

import { useAutoRef } from "./useAutoRef"

export function useNumberRange(
  refA: React.MutableRefObject<HTMLInputElement>,
  refB: React.MutableRefObject<HTMLInputElement>,
) {
  const [valueA, setValueA] = React.useState<number | undefined>(() => refA.current.valueAsNumber)
  const [valueB, setValueB] = React.useState<number | undefined>(() => refB.current.valueAsNumber)

  const valuesRef = useAutoRef([valueA, valueB])

  const range = React.useMemo(() => {
    const list = [isNumber(valueA) ? valueA : undefined, isNumber(valueB) ? valueB : undefined]
    return isNumber(valueA) && isNumber(valueB) && valueB < valueA ? list.reverse() : list
  }, [valueA, valueB])

  const clear = React.useCallback(() => {
    setValueA(undefined)
    setValueB(undefined)

    catchError(() => {
      refA.current.value = ""
      refB.current.value = ""
    })
  }, [refA, refB])

  const swapIfNecessary = React.useCallback(() => {
    const [valueA, valueB] = valuesRef.current
    const inputA = refA.current
    const inputB = refB.current

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

  const handleAChange = React.useCallback(() => {
    const value = refA.current.valueAsNumber
    if (isNumeric(value, false)) setValueA(value)
  }, [refA])

  const handleBChange = React.useCallback(() => {
    const value = refB.current.valueAsNumber
    if (isNumeric(value, false)) setValueB(value)
  }, [refB])

  const handleABlur = React.useCallback(() => {
    setValueA((value: any) => (isNumber(value) ? value : undefined))
    setImmediate(() => swapIfNecessary())
  }, [swapIfNecessary])

  const handleBBlur = React.useCallback(() => {
    setValueB((value: any) => (isNumber(value) ? value : undefined))
    setImmediate(() => swapIfNecessary())
  }, [swapIfNecessary])

  React.useDebugValue({ from: valueA, to: valueB, range })

  const values = { from: valueA, to: valueB, range }
  const handleChangeFns = { from: handleAChange, to: handleBChange }
  const handleBlurFns = { from: handleABlur, to: handleBBlur }
  const setValueFns = { from: setValueA, to: setValueB, clear }

  return [values, handleChangeFns, handleBlurFns, setValueFns] as const
}
