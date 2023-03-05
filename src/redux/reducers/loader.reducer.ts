import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface LoaderState {
  count: number
}

const initialState = {
  count: 0,
} as LoaderState

const loaderSlice = createSlice({
  name: "@loader",
  initialState,
  reducers: {
    increase(state) {
      state.count++
    },
    decrease(state) {
      state.count--
    },
    adjust(state, action: PayloadAction<number>) {
      const adjustment = state.count + action.payload
      state.count = adjustment > -1 ? adjustment : 0
    },
    reset(state) {
      state.count = 0
    },
  },
})

export const loaderActions = loaderSlice.actions
export default loaderSlice.reducer
