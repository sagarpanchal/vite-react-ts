import React from "react"

import { isHTMLElement, isNumber, isNumeric, logWarn } from "utils"

import { useAutoRef } from "./useAutoRef"

const getInput = (ref: any) => ref?.current?.inputRef?.input ?? ref?.current?.inputNumberRef?.input ?? ref?.current

export function useNumberInput(
  inputRef: React.MutableRefObject<HTMLInputElement | any>,
): [number | undefined | "", (ev: any) => void, () => void, { value: React.Dispatch<any>; clear: () => void }] {
  const [value, setValue] = React.useState(() => getInput(inputRef)?.value)

  const valueRef = useAutoRef(value)

  const clearValue = React.useCallback(() => {
    setValue(undefined)

    try {
      getInput(inputRef).value = ""
      if (inputRef.current?.inputRef) inputRef.current.inputRef.rawInput = ""
      if (inputRef.current?.inputNumberRef) inputRef.current.inputNumberRef.rawInput = ""
    } catch (e) {
      logWarn(e)
    }
  }, [inputRef])

  const afterBlur = React.useCallback(() => {
    const value = valueRef.current
    const input = getInput(inputRef)

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

  return [value, handleChange, handleBlur, { value: setValue, clear: clearValue }]
}
