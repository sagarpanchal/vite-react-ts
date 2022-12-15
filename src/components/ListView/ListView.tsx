import React from "react"

import { FontIcon } from "shared/components/Icon"
import { Pagination } from "shared/components/Pagination"

import { EMPTY_VALUES } from "utils/utils.constants"

import { usePagination } from "hooks"
import { useBackendAPI } from "hooks/useBackendAPI"
import { cx, isArray } from "utils"

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
    <React.Fragment>
      <nav className={cx(cx.withPostfix("navbar", "expand-lg"), "bg-light")}>
        <div className={cx("container-fluid")}>
          <div className={cx("col-auto")}>
            <div className={cx("row", "gx-2")}>
              <div className={cx("col-auto")}>
                <button className={cx(cx.withPostfix("btn", "primary"))} onClick={reloadList}>
                  {listLoading ? (
                    <span className={cx(cx.withPostfix("spinner-border", "sm"))} role="status" aria-hidden="true" />
                  ) : (
                    <FontIcon type="arrow-repeat" />
                  )}
                </button>
              </div>
              <div className={cx("col-auto")}>
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
          </div>
        </div>
      </nav>
      <div className={cx("container-fluid")}>
        <div className={cx("row", "py-2")}></div>
      </div>
    </React.Fragment>
  )
}
