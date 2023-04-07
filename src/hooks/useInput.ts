import React from "react"

export function useInput(initialValue = "") {
  const [inputValue, setInputValue] = React.useState(initialValue)

  const handleChange = React.useCallback((e: React.FormEvent<HTMLInputElement>): void => {
    setInputValue(e.currentTarget.value)
  }, [])

  const clearInputValue = React.useCallback((): void => {
    setInputValue("")
  }, [])

  return [inputValue, { handleChange, setInputValue, clearInputValue }] as const
}
