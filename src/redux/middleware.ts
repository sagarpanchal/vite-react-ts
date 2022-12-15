import { ConfigureStoreOptions } from "@reduxjs/toolkit"

export const middleware: ConfigureStoreOptions["middleware"] = (getDefaultMiddleware) => [
  ...getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
    thunk: true,
  }),
]
