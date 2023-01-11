import React from "react"

import { isEmpty, isString } from "utils"

export function useInput(): [
  string,
  {
    value: string | undefined
    handleChange: (e: React.FormEvent<HTMLInputElement>) => void
    clearInputValue: () => void
    setInputValue: React.Dispatch<React.SetStateAction<string>>
  },
] {
  const [inputValue, setInputValue] = React.useState("")

  const handleChange = React.useCallback((e: React.FormEvent<HTMLInputElement>): void => {
    setInputValue(e.currentTarget.value)
  }, [])

  const clearInputValue = React.useCallback((): void => {
    setInputValue("")
  }, [])

  const value = isString(inputValue) && !isEmpty(inputValue) ? inputValue : undefined

  return [inputValue, { value, handleChange, setInputValue, clearInputValue }]
}
