import { createAction, createReducer, PayloadAction } from "@reduxjs/toolkit"

export const initState = {
  count: 0,
}

export const loaderActions = {
  increase: createAction("@loader/increase"),
  decrease: createAction("@loader/decrease"),
  adjust: createAction<number>("@loader/adjust"),
  reset: createAction("@loader/reset"),
}

const loaderReducer = createReducer(initState, (builder) => {
  builder
    .addCase(loaderActions.increase.type, (state) => {
      state.count = state.count + 1
    })
    .addCase(loaderActions.decrease.type, (state) => {
      state.count = state.count - 1
    })
    .addCase(loaderActions.adjust.type, (state, { payload }: PayloadAction<number>) => {
      const adjustment = state.count + payload
      state.count = adjustment > -1 ? adjustment : 0
    })
    .addCase(loaderActions.reset.type, (state) => {
      state.count = 0
    })
})

export default loaderReducer
