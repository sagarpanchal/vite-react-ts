import React from "react"

export function useBitFlipState(isTrue: boolean | undefined): (boolean | undefined)[] {
  const prevIsTrueRef = React.useRef(isTrue)

  const [flippedTrue, setFlippedTrue] = React.useState<boolean | undefined>(false)
  const [flippedFalse, setFlippedFalse] = React.useState<boolean | undefined>(false)

  React.useEffect(() => {
    const prevIsTrue = prevIsTrueRef.current
    setFlippedTrue(!(prevIsTrue ?? true) && isTrue)
    setFlippedFalse((prevIsTrue ?? false) && !isTrue)
    prevIsTrueRef.current = isTrue
  }, [isTrue])

  React.useDebugValue({ isTrue, flippedTrue, flippedFalse })
  return [isTrue, flippedTrue, flippedFalse]
}
