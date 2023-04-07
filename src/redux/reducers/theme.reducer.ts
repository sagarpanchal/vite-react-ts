import { createSlice } from "@reduxjs/toolkit"
import { ValueOf } from "type-fest"

const themeMap = {
  auto: "auto",
  dark: "dark",
  light: "light",
} as const

const themeIconMap = {
  [themeMap.auto]: "circle-half",
  [themeMap.dark]: "moon-stars-fill",
  [themeMap.light]: "sun-fill",
} as const

const themeCycleMap = {
  [themeMap.auto]: "light",
  [themeMap.dark]: "auto",
  [themeMap.light]: "dark",
} as const

export interface ThemeState {
  type: ValueOf<typeof themeMap>
  icon: ValueOf<typeof themeIconMap>
}

const initialState: ThemeState = {
  type: themeMap.auto,
  icon: themeIconMap.auto,
}

const themeSlice = createSlice({
  name: "@theme",
  initialState,
  reducers: {
    setLight(state) {
      state.type = themeMap.light
      state.icon = themeIconMap.light
    },
    setDark(state) {
      state.type = themeMap.dark
      state.icon = themeIconMap.dark
    },
    setAuto(state) {
      state.type = themeMap.auto
      state.icon = themeIconMap.auto
    },
    setNext(state) {
      state.type = themeCycleMap[state.type]
      state.icon = themeIconMap[state.type]
    },
  },
})

export const themeActions = themeSlice.actions
export default themeSlice.reducer
