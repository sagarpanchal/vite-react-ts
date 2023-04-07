import React from "react"

import { catchError, debounce } from "utils"

type UseIsIntersectingOptions = {
  root?: Element | Document | null
  rootMargin?: string
  threshold?: number | number[]
  freezeOnceVisible?: boolean
}

export function useIsIntersecting(ref: React.MutableRefObject<HTMLElement>, options: UseIsIntersectingOptions = {}) {
  const [isIntersecting, setIntersecting] = React.useState(false)

  options = { ...options } as UseIsIntersectingOptions

  const observer = React.useMemo(() => {
    return catchError(() => {
      const debouncedSetIntersecting = debounce(setIntersecting)
      return new IntersectionObserver(
        ([entry]) => {
          return entry.isIntersecting
            ? setIntersecting(entry.isIntersecting)
            : debouncedSetIntersecting(entry.isIntersecting)
        },
        {
          root: options.root ?? null,
          rootMargin: options.rootMargin ?? "0%",
          threshold: options.threshold ?? 0,
        },
      )
    })
  }, [options.root, options.rootMargin, options.threshold])

  React.useLayoutEffect(() => {
    // stop observing when rendered
    if (isIntersecting && options.freezeOnceVisible) return

    catchError(() => observer.observe(ref.current))
    return () => void catchError(() => observer.disconnect())
  }, [isIntersecting, observer, options.freezeOnceVisible, ref])

  return isIntersecting
}
