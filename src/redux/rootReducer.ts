import { combineReducers } from "@reduxjs/toolkit"

import loaderReducer from "./reducers/loader.reducer"

export const rootReducer = combineReducers({
  loader: loaderReducer,
})
