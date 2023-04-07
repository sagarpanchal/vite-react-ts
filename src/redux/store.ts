import { configureStore } from "@reduxjs/toolkit"

import { middleware } from "redux/middleware"
import { rootReducer } from "redux/rootReducer"
import { isDevEnv } from "utils"

export const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: isDevEnv() ? { trace: true, traceLimit: 15 } : false,
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
