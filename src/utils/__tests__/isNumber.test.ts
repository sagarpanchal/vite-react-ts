import { describe, it, expect } from "vitest"

import { isNumber } from "utils/isNumber"

describe("utils.isNumber", () => {
  it("Checks number values", () => {
    expect(isNumber(0)).toBe(true)
    expect(isNumber(0x11)).toBe(true)
    expect(isNumber(123e-1)).toBe(true)
    expect(isNumber(10_000_000)).toBe(true)

    expect(isNumber(Infinity)).toBe(false)
    expect(isNumber(NaN)).toBe(false)
  })

  it("Checks non-number values", () => {
    expect(isNumber("")).toBe(false)
    expect(isNumber({})).toBe(false)
    expect(isNumber([])).toBe(false)
    expect(isNumber(false)).toBe(false)
    expect(isNumber(null)).toBe(false)
    expect(isNumber(undefined)).toBe(false)
  })
})
