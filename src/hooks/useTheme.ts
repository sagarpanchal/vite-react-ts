import React from "react"
import { useSelector } from "react-redux"

import { themeActions } from "redux/reducers/theme.reducer"
import { RootState, store } from "redux/store"

export function useTheme() {
  const state = useSelector<RootState, RootState["theme"]>((state) => state.theme)

  const setState = React.useMemo(() => {
    return {
      setLight: () => store.dispatch(themeActions.setLight()),
      setDark: () => store.dispatch(themeActions.setDark()),
      setAuto: () => store.dispatch(themeActions.setAuto()),
      setNext: () => store.dispatch(themeActions.setNext()),
    }
  }, [])

  React.useDebugValue(state)
  return [state, setState] as const
}

export function useApplyThemeChanges() {
  const theme = useSelector<RootState, RootState["theme"]>((state) => state.theme)

  React.useLayoutEffect(() => {
    document.documentElement.setAttribute(
      "data-bs-theme",
      !["light", "dark"].includes(theme.type)
        ? window.matchMedia("(prefers-color-scheme: dark)")?.matches
          ? "dark"
          : "light"
        : theme.type,
    )
  }, [theme])
}
