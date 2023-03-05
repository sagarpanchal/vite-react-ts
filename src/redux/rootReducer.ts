import { combineReducers } from "@reduxjs/toolkit"

import loaderReducer from "./reducers/loader.reducer"
import themeReducer from "./reducers/theme.reducer"

export const rootReducer = combineReducers({
  loader: loaderReducer,
  theme: themeReducer,
})
