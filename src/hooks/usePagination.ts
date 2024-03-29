import React from "react"

import { PAGE_LENGTH_OPTIONS } from "shared/components/Pagination/Pagination.const"

import { useAutoRef } from "./useAutoRef"

export function usePagination(page = 1, limit: number = PAGE_LENGTH_OPTIONS[1]) {
  const [state, _setState] = React.useState({ page, limit })
  const paramsRef = useAutoRef({ page, limit })

  const setPagination = React.useCallback((page?: number, limit?: number) => {
    _setState((state) => ({
      page: page ?? state.page,
      limit: limit ?? state.limit,
    }))
  }, [])

  const resetPagination = React.useCallback(() => {
    _setState({
      page: paramsRef.current?.page ?? 0,
      limit: paramsRef.current?.limit ?? PAGE_LENGTH_OPTIONS[1],
    })
  }, [paramsRef])

  React.useDebugValue(state)
  return [state?.page, state?.limit, setPagination, resetPagination] as const
}
