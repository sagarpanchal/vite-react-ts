import React from "react"

import { isHTMLElement, isNumber, isNumeric, logWarn } from "utils"

import { useAutoRef } from "./useAutoRef"

export function useNumberInput(inputRef: React.MutableRefObject<HTMLInputElement>) {
  const [value, setValue] = React.useState<number | string | undefined>(() => inputRef.current?.valueAsNumber)

  const valueRef = useAutoRef(value)

  const clearValue = React.useCallback(() => {
    setValue(undefined)
    try {
      inputRef.current.value = ""
    } catch (e) {
      logWarn(e)
    }
  }, [inputRef])

  const afterBlur = React.useCallback(() => {
    const value = valueRef.current
    const input = inputRef.current

    const inputIsInactive = isHTMLElement(input) ? document.activeElement !== input : true
    if (!inputIsInactive) return

    const valueIsNumber = isNumber(value)
    if (!valueIsNumber) setValue(undefined)
  }, [inputRef, valueRef])

  const handleChange = React.useCallback((): void => {
    const value = inputRef.current.valueAsNumber
    if (isNumeric(value, false)) setValue(value)
  }, [inputRef])

  const handleBlur = React.useCallback((): void => {
    setValue((value) => (isNumber(value) ? value : undefined))
    setImmediate(() => afterBlur())
  }, [afterBlur])

  return [value, handleChange, handleBlur, { value: setValue, clear: clearValue }] as const
}
