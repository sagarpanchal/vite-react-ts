import React from "react"

import { invariant } from "@remix-run/router"

import { FontIcon } from "shared/components/Icon"

import type { Overwrite } from "utils/types"
import { ArrayElement } from "utils/types"

import { castToNumber, cx, isEmpty, isNumber, stopEvent } from "utils"

import { PAGE_LENGTH_OPTIONS } from "./Pagination.const"
import styles from "./Pagination.module.scss"

import { Select, SelectProps } from "../Select"

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

export const Pagination: React.FC<IPaginationProps> = React.memo((props) => {
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
  invariant(isNumber(total) && total > -1, "prop `total` must be a positive number")
  invariant(isNumber(count) && count > -1, "prop `count` must be a positive number")

  const totalPages = React.useMemo(() => (total === 0 ? 1 : Math.ceil(total / limit)), [limit, total])

  const formattedPages = getPages(totalPages, page)

  const gotoPrevPage = React.useCallback(
    (e?: React.FormEvent<HTMLAnchorElement>) => {
      stopEvent(e)
      if (page !== 1) onChange(page - 1, limit)
    },
    [limit, onChange, page],
  )

  const gotoNextPage = React.useCallback(
    (e?: React.FormEvent<HTMLAnchorElement>) => {
      stopEvent(e)
      if (page !== totalPages) onChange(page + 1, limit)
    },
    [limit, onChange, page, totalPages],
  )

  const limitOptions = (() => {
    if (isEmpty(total) || loading) return PAGE_LENGTH_OPTIONS
    const lastIndex = PAGE_LENGTH_OPTIONS.findIndex((page) => page >= total)
    return PAGE_LENGTH_OPTIONS.slice(0, lastIndex + 1)
  })().map((value) => ({ label: value, value: value }))

  const handleLimitChange: SelectProps["onChange"] = (_option: unknown) => {
    const option = (_option ?? {}) as ArrayElement<typeof limitOptions>
    onChange(1, castToNumber(option.value, PAGE_LENGTH_OPTIONS[0]))
  }

  const countDescriptionTest = (() => {
    if (noCountDescription) return ""
    if (loading) return `Loading ${entityLabel}`

    const nStart = count > 0 ? (page - 1) * limit + 1 : 0
    const nEnd = count > 0 ? (page - 1) * limit + count : 0
    return `${nStart} - ${nEnd} of ${total} ${entityLabel}`
  })()

  return (
    <div className={cx(styles["pagination"], loading && "cursor-progress", className)} {...rest}>
      {!noLimitSelector && <Select options={limitOptions} value={limit} onChange={handleLimitChange} />}
      <nav className={cx(styles["pagination-pages"])} aria-label="Pagination">
        <a href="#" className={cx(styles["page-link"])} onClick={gotoPrevPage}>
          <FontIcon type="chevron-left" />
          <span className="sr-only">Previous</span>
        </a>
        {formattedPages.map((_page, index) => {
          const isEllipsis = _page === OVERFLOW_DOTS

          const handleClick = (e?: React.FormEvent<HTMLAnchorElement>) => {
            stopEvent(e)
            if (!isEllipsis) onChange(castToNumber(_page, 0), limit)
          }

          return (
            <a
              key={isEllipsis ? `ellip_${index}` : `page_${_page}`}
              className={cx(styles["page-link"], _page === page && styles["page-link-active"])}
              onClick={handleClick}
              href="#"
            >
              {_page}
            </a>
          )
        })}
        <a href="#" className={cx(styles["page-link"])} onClick={gotoNextPage}>
          <FontIcon type="chevron-right" />
          <span className="sr-only">Next</span>
        </a>
      </nav>
      {!noCountDescription && (
        <div className={cx(styles["pagination-count"])}>
          <span>{countDescriptionTest}</span>
        </div>
      )}
    </div>
  )
})
Pagination.displayName = "Pagination"
