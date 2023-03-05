import React from "react"

import { formatInlineList, isArray } from "utils"

export function useInlineList(initialValue: string | string[]) {
  const [value, _setValue] = React.useState(() => {
    const value = initialValue
    return formatInlineList(isArray(value) ? (value as string[]).join(",") : (value as string), {
      allowAppend: false,
    }) as string
  })

  const handleChange = React.useCallback((_value: string) => {
    const value = formatInlineList(_value, { allowAppend: true }) as string
    _setValue(value)
  }, [])

  const handleBlur = React.useCallback(() => {
    _setValue((value) => formatInlineList(value, { allowAppend: false }) as string)
  }, [])

  const setValue = React.useCallback((_value: string) => {
    const value = formatInlineList(_value, { allowAppend: false }) as string
    _setValue(value)
  }, [])

  return [value, handleChange, handleBlur, setValue] as const
}
