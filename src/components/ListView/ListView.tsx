import React from "react"

import { Button } from "shared/components/Button"
import { FontIcon } from "shared/components/Icon"
import { Pagination } from "shared/components/Pagination"

import { EMPTY_VALUES } from "utils/utils.constants"

import { usePagination } from "hooks"
import { useBackendAPI } from "hooks/useBackendAPI"
import { isArray } from "utils"

export function ListView() {
  const [page, limit, setPagination, resetPagination] = usePagination()

  const [listLoading, listResponse, reloadList] = useBackendAPI(
    {
      route: { method: "get", url: "items" },
      defaultResult: EMPTY_VALUES.ARRAY,
      callback: (instance) => {
        return instance.setQueryParams({ page, limit }).showLoader()
      },
      transform: (response) => {
        if (response.ok && isArray(response?.data)) return response?.data
      },
      resetBeforeLoading: false,
      callAutomatically: true,
    },
    [page, limit],
  )

  console.info({ listResponse })

  React.useEffect(() => {
    resetPagination()
  }, [resetPagination])

  return (
    <div className="container px-4 py-3">
      <div className="isolate inline-flex gap-3">
        <Button onClick={reloadList}>
          <FontIcon icon="arrow-repeat" />
        </Button>
        <Pagination
          loading={listLoading}
          page={page}
          limit={limit}
          count={10}
          total={100}
          onChange={setPagination}
          entityLabel="Items"
        />
      </div>
    </div>
  )
}
