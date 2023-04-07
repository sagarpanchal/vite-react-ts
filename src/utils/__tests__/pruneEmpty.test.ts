import { describe, it, expect } from "vitest"

import { pruneEmpty } from "utils/pruneEmpty"

describe("utils.pruneEmpty", () => {
  it("Prunes empty values", () => {
    const input = { list: [NaN, Infinity, "", "  ", [], {}] }
    const output = pruneEmpty(input)
    expect(output).toBe(undefined)
  })

  it("Keep non-empty values", () => {
    const input: any = { list: [NaN, Infinity, "", "  ", [], {}, "vitest", { list: { vitest: 1 } }] }
    const output = pruneEmpty(input)
    expect(output?.list?.[0]).toBe("vitest")
    expect(output?.list?.[1]?.list?.vitest).toBe(1)
  })
})
