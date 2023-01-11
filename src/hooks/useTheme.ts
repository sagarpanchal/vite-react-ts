import React from "react"

type useThemeSetter = {
  light: () => void
  dark: () => void
  auto: () => void
}

const getPreferredTheme = () => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

export function useTheme(): [keyof useThemeSetter, useThemeSetter] {
  const storedTheme = (localStorage.getItem("theme") ?? "auto") as keyof useThemeSetter

  const [state, _setState] = React.useState<keyof useThemeSetter>(storedTheme)

  const setState = React.useMemo(() => {
    return {
      light: () => _setState("light"),
      dark: () => _setState("dark"),
      auto: () => _setState("auto"),
    }
  }, [])

  React.useEffect(() => {
    if (!["light", "dark"].includes(state)) {
      localStorage.removeItem("theme")
      document.documentElement.setAttribute("data-bs-theme", getPreferredTheme())
    } else {
      localStorage.setItem("theme", state)
      document.documentElement.setAttribute("data-bs-theme", state)
    }
  }, [state])

  React.useDebugValue(state)
  return [state, setState]
}
