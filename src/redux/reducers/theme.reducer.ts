import { createSlice } from "@reduxjs/toolkit"

export interface ThemeState {
  type: "auto" | "dark" | "light"
}

const initialState = {
  type: "auto",
} as ThemeState

const themeCycleMap = {
  light: "dark",
  dark: "auto",
  auto: "light",
} as const

const themeSlice = createSlice({
  name: "@theme",
  initialState,
  reducers: {
    setLight(state) {
      state.type = "light"
    },
    setDark(state) {
      state.type = "dark"
    },
    setAuto(state) {
      state.type = "auto"
    },
    setNext(state) {
      state.type = themeCycleMap[state.type]
    },
  },
})

export const themeActions = themeSlice.actions
export default themeSlice.reducer
