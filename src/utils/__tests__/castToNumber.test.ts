import { describe, it, expect } from "vitest"

import { castToNumber } from "utils/castToNumber"

describe("utils.castToNumber", () => {
  it("Casts valid values to number", () => {
    expect(castToNumber("1,10,101")).toBe(110101)
    expect(castToNumber("+1,10,101$")).toBe(110101)
    expect(castToNumber("-1,10,101$")).toBe(-110101)
    expect(castToNumber("+abcdefghi1")).toBe(1)
  })
  it("Casts invalid values to undefined", () => {
    expect(castToNumber("+1,10+,101")).toBe(undefined)
    expect(castToNumber("+abcdefghi")).toBe(undefined)
    expect(castToNumber("-1-,10,101$")).toBe(undefined)
  })
})
