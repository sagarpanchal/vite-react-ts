import React from "react"

export function useAutoRef<T>(value: T): React.MutableRefObject<T> {
  const ref = React.useRef(value)

  React.useEffect(() => {
    ref.current = value
  }, [value])

  React.useDebugValue(ref.current)
  return ref
}
