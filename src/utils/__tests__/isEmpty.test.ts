import { describe, it, expect } from "vitest"

import { isEmpty } from "utils/isEmpty"

describe("utils.isEmpty", () => {
  it("Checks empty values", () => {
    expect(isEmpty(NaN)).toBe(true)
    expect(isEmpty(Infinity)).toBe(true)
    expect(isEmpty("")).toBe(true)
    expect(isEmpty("  ")).toBe(true)
    expect(isEmpty([])).toBe(true)
    expect(isEmpty({})).toBe(true)
  })

  it("Checks non-empty values", () => {
    expect(isEmpty(1)).toBe(false)
    expect(isEmpty("A")).toBe(false)
    expect(isEmpty([1])).toBe(false)
    expect(isEmpty({ n: 1 })).toBe(false)
  })
})
