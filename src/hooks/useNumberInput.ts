import React from "react"

import { isHTMLElement, isNumber, isNumeric, logWarn } from "utils"

import { useAutoRef } from "./useAutoRef"

export function useNumberInput(inputRef: React.MutableRefObject<HTMLInputElement>) {
  // [number | undefined | "", (ev: any) => void, () => void, { value: React.Dispatch<any>; clear: () => void }]
  const [value, setValue] = React.useState<number | string | undefined>(() => inputRef.current?.value)

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

  const handleChange = React.useCallback((eventOrValue: any): void => {
    const value = eventOrValue
    if (isNumeric(value, false)) setValue(value)
  }, [])

  const handleBlur = React.useCallback((): void => {
    setValue((value: any) => (isNumber(value) ? value : undefined))
    setImmediate(() => afterBlur())
  }, [afterBlur])

  return [value, handleChange, handleBlur, { value: setValue, clear: clearValue }] as const
}
