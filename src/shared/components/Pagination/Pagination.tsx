import React from "react"

import { invariant } from "@remix-run/router"

import { FontIcon } from "shared/components/Icon"

import type { Overwrite } from "utils/types"

import { castToNumber, cx, isEmpty, isNumber } from "utils"

import { PAGE_LENGTH_OPTIONS } from "./Pagination.const"
import styles from "./Pagination.module.scss"

const OVERFLOW_DOTS = "..."

export type IPaginationProps = Overwrite<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  {
    page?: number // current page
    limit?: number // current limit
    total?: number // total count
    count?: number // data.length
    loading?: boolean // list is loading
    entityLabel?: string // label for entity
    noLimitSelector?: boolean // limit dropdown
    noCountDescription?: boolean // display items 1-10 of 1000
    onChange?: (page: number, limit: number) => void // display limit Selection
  }
>
// get list of pages [1,2,3,...,10]
function getPages(total: number, current: number, delta = 1, gap = OVERFLOW_DOTS) {
  if (total <= 1) return [1]

  const center = [current] as (number | typeof gap)[]

  // no longer O(1) but still very fast
  for (let i = 1; i <= delta; i++) {
    center.unshift(current - i)
    center.push(current + i)
  }

  const filteredCenter = center.filter((page) => page > 1 && page < total)

  const includeLeftGap = current > 3 + delta
  const includeLeftPages = current === 3 + delta
  const includeRightGap = current < total - (2 + delta)
  const includeRightPages = current === total - (2 + delta)

  if (includeLeftPages) filteredCenter.unshift(2)
  if (includeRightPages) filteredCenter.push(total - 1)
  if (includeLeftGap) filteredCenter.unshift(gap)
  if (includeRightGap) filteredCenter.push(gap)

  return [1, ...filteredCenter, total]
}

export function Pagination(props: IPaginationProps) {
  const {
    page = 1,
    limit = PAGE_LENGTH_OPTIONS[1],
    total = 0,
    count = 0,
    loading = false,
    entityLabel = "Items",
    className,
    onChange = () => undefined,
    noCountDescription,
    noLimitSelector,
    ...rest
  } = props

  invariant(isNumber(page) && page > 0, "prop `page` must be a non-zero positive number")
  invariant(isNumber(limit) && limit > 0, "prop `limit` must be a non-zero positive number")
  invariant(isNumber(total) && total > -1, "prop `page` must be a positive number")
  invariant(isNumber(count) && count > -1, "prop `page` must be a positive number")

  const totalPages = React.useMemo(() => (total === 0 ? 1 : Math.ceil(total / limit)), [limit, total])

  const formattedPages = getPages(totalPages, page)

  const gotoPrevPage = React.useCallback(
    (e?: React.FormEvent<HTMLAnchorElement>) => {
      void e?.preventDefault?.()
      if (page !== 1) onChange(page - 1, limit)
    },
    [limit, onChange, page],
  )

  const gotoNextPage = React.useCallback(
    (e?: React.FormEvent<HTMLAnchorElement>) => {
      void e?.preventDefault?.()
      if (page !== totalPages) onChange(page + 1, limit)
    },
    [limit, onChange, page, totalPages],
  )

  const handleLimitChange = React.useCallback(
    (e: React.FormEvent<HTMLSelectElement>) => {
      onChange(1, castToNumber(e.currentTarget.value, 0))
    },
    [onChange],
  )

  const lengthOptions = (() => {
    if (isEmpty(total) || loading) return PAGE_LENGTH_OPTIONS
    const lastIndex = PAGE_LENGTH_OPTIONS.findIndex((page) => page >= total)
    return PAGE_LENGTH_OPTIONS.slice(0, lastIndex + 1)
  })()

  return (
    <div className={cx(styles["pagination"], "row", "gx-2", loading && "cursor-progress", className)} {...rest}>
      {!noLimitSelector && (
        <div className={cx(styles["pagination-limit-select"], "col-auto")}>
          <select value={limit} onChange={handleLimitChange} className="form-select">
            {lengthOptions.map((limit, index) => (
              <option key={`${limit}_${index}`} value={limit}>
                {limit}
              </option>
            ))}
          </select>
        </div>
      )}
      <div className="col-auto">
        <div className={cx(styles["pagination-pagination"], "pagination")}>
          <div className={cx("page-item")}>
            <a href="#" className={cx("page-link")} onClick={gotoPrevPage}>
              <FontIcon type="chevron-left" />
            </a>
          </div>
          {formattedPages.map((_page, index) => {
            const handleClick = (e?: React.FormEvent<HTMLAnchorElement>) => {
              void e?.preventDefault?.()
              onChange(castToNumber(_page, 0), limit)
            }

            return (
              <div key={`${_page}_${index}`} className={cx("page-item", _page === page && "active")}>
                <a href="#" className={cx("page-link")} onClick={_page !== OVERFLOW_DOTS ? handleClick : undefined}>
                  {_page}
                </a>
              </div>
            )
          })}
          <div className={cx("page-item")}>
            <a href="#" className={cx("page-link")} onClick={gotoNextPage}>
              <FontIcon type="chevron-right" />
            </a>
          </div>
        </div>
      </div>
      {!noCountDescription && (
        <div className={cx(styles["pagination-count"], "col-auto", "my-auto")}>
          <span>
            {loading && (
              <span className="spinner-border spinner-border-sm mx-2" role="status" aria-hidden="true"></span>
            )}
            {(() => {
              if (loading) return `Loading ${entityLabel}`

              const nStart = count > 0 ? (page - 1) * limit + 1 : 0
              const nEnd = count > 0 ? (page - 1) * limit + count : 0
              return `${nStart} - ${nEnd} of ${total} ${entityLabel}`
            })()}
          </span>
        </div>
      )}
    </div>
  )
}
