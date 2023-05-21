import React from "react"

import { FontIcon } from "shared/components/Icon"
import { MaskedInput } from "shared/components/Input"
import { Pagination } from "shared/components/Pagination"

import { NameForm } from "components/Context/FastContextDemo"

import { EMPTY_VALUES } from "utils/utils.constants"

import { useInput, usePagination } from "hooks"
import { useBackendAPI } from "hooks/useBackendAPI"
import { INPUT_MASKS } from "libraries/inputmask/input-masks"
import { cx, isArray, logInfo } from "utils"

type Todo = {
  userId: number
  id: number
  title: string
  completed: boolean
}

export function ListView() {
  // [page, limit, setPagination, resetPagination]
  const [page, limit, setPagination] = usePagination()

  // [listLoading, listResponse, reloadList, resetList]
  const [listLoading, listResponse, reloadList] = useBackendAPI<{ data: Todo[] }, Todo[]>(
    {
      route: { method: "get", url: "https://jsonplaceholder.typicode.com/todos" },
      defaultResult: EMPTY_VALUES.ARRAY,
      callback: (instance) => {
        return instance.setQueryParams({ _start: (page - 1) * limit, _limit: limit }).showLoader()
      },
      transform: async (response) => {
        if (response.ok && isArray(response?.data)) return response?.data
      },
      resetBeforeLoading: false,
      callAutomatically: true,
    },
    [page, limit],
  )

  const [phone, setPhone] = useInput("")

  React.useEffect(() => {
    logInfo(listResponse)
  }, [listResponse])

  return (
    <React.Fragment>
      <div className="container-fluid py-3">
        <div className="row">
          <div className="col">
            <div className="mb-3" style={{ maxWidth: "192px" }}>
              <label htmlFor="phone">Masked Phone Input</label>
              <MaskedInput
                mask={INPUT_MASKS.PHONE}
                value={phone}
                onChange={setPhone.handleChange}
                className="form-control"
                name="phone"
                placeholder="Phone Number"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <NameForm />
          </div>
        </div>
      </div>
      <nav className="mt-auto border-top sticky-bottom navbar navbar-expand-sm navbar-light bg-body-tertiary">
        <div className="container-fluid">
          <div className="col-auto me-auto ms-auto me-sm-0">
            <div className="row gx-2">
              <div className="col-auto d-none d-sm-flex">
                <button className={cx(cx.withPostfix("btn", "primary"))} onClick={reloadList}>
                  {listLoading ? (
                    <span className={cx(cx.withPostfix("spinner-border", "sm"))} role="status" aria-hidden="true" />
                  ) : (
                    <FontIcon type="arrow-repeat" />
                  )}
                </button>
              </div>
              <div className="col-auto">
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
    </React.Fragment>
  )
}
