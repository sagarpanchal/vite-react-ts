import React from "react"

export function useAutoRef<T>(value: T) {
  const ref = React.useRef(value)

  React.useEffect(() => {
    ref.current = value
  }, [value])

  React.useDebugValue(ref.current)
  return ref
}
