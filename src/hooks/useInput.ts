import React from "react"

import { isEmpty, isString } from "utils"

export function useInput() {
  const [inputValue, setInputValue] = React.useState("")

  const handleChange = React.useCallback((e: React.FormEvent<HTMLInputElement>): void => {
    setInputValue(e.currentTarget.value)
  }, [])

  const clearInputValue = React.useCallback((): void => {
    setInputValue("")
  }, [])

  const value = isString(inputValue) && !isEmpty(inputValue) ? inputValue : undefined

  return [inputValue, { value, handleChange, setInputValue, clearInputValue }] as const
}
