import React from "react"

import { StoryFn, Meta } from "@storybook/react"

import { EMPTY_VALUES } from "utils/utils.constants"

import { useBackendAPI, usePagination } from "hooks"
import { delay, isArray } from "utils"

import { Pagination } from "./Pagination"

import "styles/main.scss"

export default {
  title: "Shared/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
  },
} as Meta<typeof Pagination>

export const Pagination_: StoryFn<typeof Pagination> = () => {
  const [page, limit, setPagination, resetPagination] = usePagination()

  const [listLoading] = useBackendAPI(
    {
      route: { method: "get", url: "items" },
      defaultResult: EMPTY_VALUES.ARRAY,
      callback: (instance) => {
        return instance.setQueryParams({ page, limit }).showLoader()
      },
      transform: async (response) => {
        await delay(1500)
        if (response.ok && isArray(response?.data)) return response?.data
      },
      resetBeforeLoading: false,
      callAutomatically: true,
    },
    [page, limit],
  )

  React.useEffect(() => {
    resetPagination()
  }, [resetPagination])

  return (
    <Pagination
      loading={listLoading}
      page={page}
      limit={limit}
      count={10}
      total={100}
      onChange={setPagination}
      entityLabel="Items"
    />
  )
}
Pagination_.parameters = {
  controls: { hideNoControlsWarning: true },
}
