import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Pagination, PaginationStyles } from "shared/components/Pagination"
import type { IPaginationProps } from "shared/components/Pagination"

describe("Pagination functions", () => {
  let props: IPaginationProps = { loading: false, page: 1, limit: 10, count: 5, total: 100, entityLabel: "Products" }
  const handlePaginationChange = (page = props.page, limit = props.limit) => void (props = { ...props, page, limit })

  const result = render(<Pagination {...props} onChange={handlePaginationChange} />)

  it("Renders buttons as expected", () => {
    result.rerender(<Pagination {...props} onChange={handlePaginationChange} />)

    const pageLinks = result.container.getElementsByClassName(PaginationStyles["page-link"])

    // checking all buttons from left to right
    expect(pageLinks[0].children[0].tagName === "I").toBeTruthy() // Icon '<' Button
    expect(pageLinks[1].innerHTML === "1").toBeTruthy()
    expect(pageLinks[1].classList?.contains?.(PaginationStyles["page-link-active"])).toBeTruthy() // first page should active
    expect(pageLinks[2].innerHTML === "2").toBeTruthy()
    expect(pageLinks[3].innerHTML === "...").toBeTruthy() // "..." ellipsis w
    expect(pageLinks[4].innerHTML === "10").toBeTruthy()
    expect(pageLinks[5].children[0].tagName === "I").toBeTruthy() // Icon '>' Button
  })

  it("Interacts as expected", () => {
    result.rerender(<Pagination {...props} onChange={handlePaginationChange} />)
    expect(screen.getByText("1 - 5 of 100 Products")).toBeTruthy()

    props.page = 5
    result.rerender(<Pagination {...props} onChange={handlePaginationChange} />)
    fireEvent.click(screen.getByText("6"))
    expect(props?.page === 6).toBeTruthy()

    result.rerender(<Pagination {...props} onChange={handlePaginationChange} />)
    const pageLinks = result.container.getElementsByClassName(PaginationStyles["page-link"])

    // checking all buttons from left to right
    expect(pageLinks[0].children[0].tagName === "I").toBeTruthy() // Icon '<' Button
    expect(pageLinks[1].innerHTML === "1").toBeTruthy()
    expect(pageLinks[2].innerHTML === "...").toBeTruthy()
    expect(pageLinks[3].innerHTML === "5").toBeTruthy()
    expect(pageLinks[4].classList?.contains?.(PaginationStyles["page-link-active"])).toBeTruthy() // first page should active
    expect(pageLinks[4].innerHTML === "6").toBeTruthy()
    expect(pageLinks[5].innerHTML === "7").toBeTruthy()
    expect(pageLinks[6].innerHTML === "...").toBeTruthy()
    expect(pageLinks[7].innerHTML === "10").toBeTruthy()
    expect(pageLinks[8].children[0].tagName === "I").toBeTruthy() // Icon '>' Button

    expect(screen.getByText("51 - 55 of 100 Products")).toBeTruthy()
  })
})
