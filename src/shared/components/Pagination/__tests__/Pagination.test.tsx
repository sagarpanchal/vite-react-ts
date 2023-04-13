import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { PaginationProps, Pagination } from "../Pagination"

describe("Pagination functions", () => {
  let props: Omit<PaginationProps, "onChange"> = {
    loading: false,
    page: 1,
    limit: 10,
    count: 5,
    total: 100,
    entityLabel: "Products",
  }
  const handlePaginationChange = (page = props.page, limit = props.limit) => void (props = { ...props, page, limit })

  const result = render(<Pagination {...props} onChange={handlePaginationChange} />)

  it("Renders buttons as expected", () => {
    const pageLinks = screen.getAllByRole("link", { name: /goto\s(?:page)?.*/i })

    // checking all buttons
    //// page 1 should be active
    expect(pageLinks[1].getAttribute("aria-current")).toBe("true")

    //// Icon '<' Button
    expect(pageLinks[0].getAttribute("aria-label")).toBe("Goto Previous Page")
    expect(pageLinks[0].children[0].tagName).toBe("I")

    //// Icon '>' Button
    expect(pageLinks[5].getAttribute("aria-label")).toBe("Goto Next Page")
    expect(pageLinks[5].children[0].tagName).toBe("I")

    //// numbers and overflow(...)
    expect(pageLinks[1].innerHTML).toBe("1")
    expect(pageLinks[2].innerHTML).toBe("2")
    expect(pageLinks[3].innerHTML).toBe("...")
    expect(pageLinks[4].innerHTML).toBe("10")

    // Count Description Text
    expect(screen.getByText("1 - 5 of 100 Products")).toBeTruthy()
  })

  it("Interacts and renders as expected", () => {
    props.page = 5 // change page prop
    result.rerender(<Pagination {...props} onChange={handlePaginationChange} />)
    fireEvent.click(screen.getByRole("link", { name: "Goto Page 6" })) // click on 6
    expect(props?.page).toBe(6)

    result.rerender(<Pagination {...props} onChange={handlePaginationChange} />)
    const pageLinks = screen.getAllByRole("link", { name: /goto\s(?:page)?.*/i })

    // checking all buttons
    //// page 6 should be active
    expect(pageLinks[4].getAttribute("aria-current")).toBe("true")

    //// Icon '<' Button
    expect(pageLinks[0].getAttribute("aria-label")).toBe("Goto Previous Page")
    expect(pageLinks[0].children[0].tagName).toBe("I")

    //// Icon '>' Button
    expect(pageLinks[8].getAttribute("aria-label")).toBe("Goto Next Page")
    expect(pageLinks[8].children[0].tagName).toBe("I")

    //// numbers and overflow(...)
    expect(pageLinks[1].innerHTML).toBe("1")
    expect(pageLinks[2].innerHTML).toBe("...")
    expect(pageLinks[3].innerHTML).toBe("5")
    expect(pageLinks[4].innerHTML).toBe("6")
    expect(pageLinks[5].innerHTML).toBe("7")
    expect(pageLinks[6].innerHTML).toBe("...")
    expect(pageLinks[7].innerHTML).toBe("10")

    // Count Description Text
    expect(screen.getByText("51 - 55 of 100 Products")).toBeTruthy()
  })
})
