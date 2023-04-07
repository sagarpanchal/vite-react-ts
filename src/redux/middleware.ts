import { ConfigureStoreOptions } from "@reduxjs/toolkit"

import { isDevEnv } from "utils"

export const middleware: ConfigureStoreOptions["middleware"] = (getDefaultMiddleware) => [
  ...getDefaultMiddleware({
    immutableCheck: isDevEnv(),
    serializableCheck: isDevEnv(),
    thunk: false,
  }),
]
