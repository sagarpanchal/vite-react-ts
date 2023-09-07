import React from "react"

import invariant from "invariant"
import { memoize } from "lodash-es"

import { FontIcon } from "shared/components/Icon"

import { castToNumber, cx, isEmpty, isNumber, stopEvent } from "utils"

import { PAGE_LENGTH_OPTIONS } from "./Pagination.const"
import styles from "./Pagination.module.scss"

const OVERFLOW_DOTS = "..." as const

export interface PaginationProps
  extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "onChange"> {
  page: number // current page
  limit: number // current limit
  total: number // total count
  count: number // data.length
  loading?: boolean // list is loading
  entityLabel: string // label for entity
  noLimitSelector?: boolean // limit dropdown
  noCountDescription?: boolean // display items 1-10 of 1000
  onChange: (page: number, limit: number) => void // display limit Selection
}

// get list of pages [1,2,3,...,10]
const getPages = memoize(
  (total: number, current: number, delta = 1, gap = OVERFLOW_DOTS) => {
    if (total <= 1) return [1]

    const center = [current] as (number | typeof gap)[]

    // no longer O(1) but still very fast
    for (let i = 1; i <= delta; i++) {
      center.unshift(current - i)
      center.push(current + i)
    }

    const filteredCenter = center.filter((page) => isNumber(page) && page > 1 && page < total)

    const includeLeftGap = current > 3 + delta
    const includeLeftPages = current === 3 + delta
    const includeRightGap = current < total - (2 + delta)
    const includeRightPages = current === total - (2 + delta)

    if (includeLeftPages) filteredCenter.unshift(2)
    if (includeRightPages) filteredCenter.push(total - 1)
    if (includeLeftGap) filteredCenter.unshift(gap)
    if (includeRightGap) filteredCenter.push(gap)

    return [1, ...filteredCenter, total]
  },
  (...args) => args.join("#"),
)

export const Pagination = React.memo<PaginationProps>((props) => {
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

  const propsRef = React.useRef(props)
  propsRef.current = props

  const totalPages = total === 0 ? 1 : Math.ceil(total / limit)

  const formattedPages = getPages(totalPages, page)

  const gotoPrevPage = React.useCallback((e?: React.FormEvent<HTMLAnchorElement>) => {
    stopEvent(e)
    const { page, limit, onChange } = propsRef.current
    if (page !== 1) onChange(page - 1, limit)
  }, [])

  const gotoNextPage = React.useCallback(
    (e?: React.FormEvent<HTMLAnchorElement>) => {
      stopEvent(e)
      const { page, limit, onChange } = propsRef.current
      if (page !== totalPages) onChange(page + 1, limit)
    },
    [totalPages],
  )

  const handleLimitChange = React.useCallback((e: React.FormEvent<HTMLSelectElement>) => {
    const { onChange } = propsRef.current
    onChange(1, castToNumber(e.currentTarget.value, 0))
  }, [])

  const lengthOptions = React.useMemo(() => {
    if (isEmpty(total) || loading) return PAGE_LENGTH_OPTIONS
    const lastIndex = PAGE_LENGTH_OPTIONS.findIndex((page) => page >= total)
    return PAGE_LENGTH_OPTIONS.slice(0, lastIndex + 1)
  }, [loading, total])

  const countDescription = (() => {
    const output = { ariaLabel: "", label: "" }
    let nStart = 0
    let nEnd = 0

    if (loading) {
      output.ariaLabel = `Loading ${entityLabel}`
      output.label = output.ariaLabel
    } else {
      nStart = count > 0 ? (page - 1) * limit + 1 : 0
      nEnd = count > 0 ? (page - 1) * limit + count : 0
      output.ariaLabel = `${nStart} to ${nEnd} of total ${total} ${entityLabel}`
      output.label = `${nStart} - ${nEnd} of ${total} ${entityLabel}`
    }

    return output
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
        <nav
          role="navigation"
          aria-label="Pagination Navigation"
          className={cx(styles["pagination-pagination"], "pagination")}
        >
          <div className={cx("page-item")}>
            <a
              role="link"
              aria-label={`Goto Previous Page`}
              href="#"
              className={cx("page-link")}
              onClick={gotoPrevPage}
            >
              <FontIcon type="chevron-left" />
            </a>
          </div>
          {formattedPages.map((_page, index) => {
            const isActive = _page === page
            const isCompressed = _page === OVERFLOW_DOTS

            const handleClick = (e?: React.FormEvent<HTMLAnchorElement>) => {
              stopEvent(e)
              if (!isCompressed) onChange(castToNumber(_page, 0), limit)
            }

            return (
              <div
                key={isCompressed ? `comp_${index}` : `page_${_page}`}
                className={cx("page-item", isActive && "active")}
              >
                <a
                  role="link"
                  aria-label={`Goto Page ${_page}`}
                  aria-current={isActive ? "true" : "false"}
                  href="#"
                  className={cx("page-link")}
                  onClick={handleClick}
                >
                  {_page}
                </a>
              </div>
            )
          })}
          <div className={cx("page-item")}>
            <a role="link" aria-label={`Goto Next Page`} href="#" className={cx("page-link")} onClick={gotoNextPage}>
              <FontIcon type="chevron-right" />
            </a>
          </div>
        </nav>
      </div>
      {!noCountDescription && (
        <div className={cx(styles["pagination-count"], "col-auto", "my-auto", "d-none", "d-sm-flex")}>
          {/* {loading && <span className="spinner-border spinner-border-sm mx-2" role="status" aria-hidden="true"></span>} */}
          <span tabIndex={0} role="note" aria-label={countDescription.ariaLabel}>
            {countDescription.label}
          </span>
        </div>
      )}
    </div>
  )
})
Pagination.displayName = "Pagination"
