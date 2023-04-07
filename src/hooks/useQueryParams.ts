import React from "react"
import { useLocation } from "react-router-dom"

import { queryStringToObject } from "utils"

export function useQueryParams() {
  const location = useLocation()
  const output = React.useMemo(() => queryStringToObject(location.search), [location.search])
  React.useDebugValue(output)
  return output
}
