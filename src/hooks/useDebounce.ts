import React from "react"

export function useDebounce<T>(value: T, delay = 0) {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value)

  React.useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay)
    return () => void clearTimeout(handler)
  }, [value, delay])

  React.useDebugValue({ debouncedValue })
  return debouncedValue
}
