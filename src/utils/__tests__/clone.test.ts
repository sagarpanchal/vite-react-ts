import { JSDOM } from "jsdom"
import { describe, it, expect } from "vitest"

import { clone } from "utils/clone"

import { BackendAPI } from "entities/BackendAPI"

describe("utils.clone", () => {
  it("Returns equal data for Null/undefined/functions/etc", () => {
    // Null
    expect(clone(null)).toBeNull()

    // Undefined
    expect(clone()).toBeUndefined()

    // Function
    const func = () => ({})
    expect(clone(func)).toBe(func)

    // Etc: numbers and string
    expect(clone(5)).toBe(5)
    expect(clone("string")).toBe("string")
    expect(clone(false)).toBe(false)
    expect(clone(true)).toBe(true)
  })

  it("Returns equal data for Class instances", () => {
    class TestClass {
      _prop = 1

      get prop() {
        return this._prop
      }
    }

    const src = new TestClass()
    const copy = clone(src)

    expect(src === copy).toBeFalsy()
    expect(src.constructor).toBe(copy.constructor)
    expect(src.prop).toBe(copy.prop)
  })

  it("Returns equal data for Class instances with clone method", () => {
    const src = new BackendAPI({ method: "get" })
    const copy = clone(src)

    expect(src === copy).toBeFalsy()
    expect(src.constructor).toBe(copy.constructor)
    expect(src.config.method).toBe(copy.config.method)
  })

  it("Returns equal data for DOM Node", () => {
    const src = new JSDOM(`<p>Hello world</p>`).window.document

    const copy = clone(src)

    expect(src.body.isEqualNode(copy.body)).toBe(true)
  })

  it("Returns equal data for Date", () => {
    const date = "2012-01-26T13:51:50.417Z"

    expect(clone(new Date(date))).toEqual(new Date(date))
  })

  it("Returns equal data for RegExp", () => {
    const regexp = /^$/

    expect(clone(regexp)).toEqual(regexp)
  })

  it("Returns equal data for Arrays", () => {
    const tests = [
      [5, 5, 8, "string"], // Flat
      [5, 5, 8, { a: "string" }, [7, 9]], // Attached
    ]

    tests.forEach((src) => {
      const copy = clone(src)

      expect(src).toEqual(copy)
    })
  })

  it("Returns equal data for Object", () => {
    const src = {
      a: 5,
      b: 6,
    }

    const copy = clone(src)

    expect(src).toEqual(copy)
  })

  it("Returns equal data for Map", () => {
    const src = new Map([["foo", "bar"]])

    const copy = clone(src)

    expect(src).toEqual(copy)
  })

  it("Returns equal data for Set", () => {
    const src = new Set(["foo", "bar"])

    const copy = clone(src)

    expect(src).toEqual(copy)
  })

  it("Doesn't clone function", () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const src = function b() {}

    const copy = clone(src)

    expect(copy).toBe(src)
  })

  it("Clones Date object", () => {
    const src = new Date()

    const copy = clone(src)

    copy.setHours(src.getHours() + 1) // +1 hour

    expect(copy.getHours()).not.toBe(src.getHours())
  })

  it("Clones RegExp", () => {
    const src = new RegExp(/''/g)

    const copy = clone(src)

    expect(copy).not.toBe(src)
  })

  it("Clones Array with nested data", () => {
    const src: any = [1, "hello", [null, "lalka"]]

    let copy = clone(src)

    copy[2][0] = "mutated"
    expect(src[2][0]).toBeNull()

    copy = copy.map(() => "mutated")

    expect(src.every((i: any) => i !== "mutated")).toBeTruthy()
  })

  it("Clones nested Arrays", () => {
    const src: any = []
    src.push(src, 2, src, 3)

    const copy = clone(src)
    expect(copy[0]).toEqual(copy)
    expect(src[0]).toEqual(src)
    expect(copy[0]).not.toBe(src[0])
  })

  it("Clones nested Objects", () => {
    const src: any = { a: 1, b: { c: 1, d: [1, 2, 3] } }
    const srcValues: any = { a: 1, b: { c: 1, d: [1, 2, 3] } }

    const copy = clone(src)
    copy.a = 2
    copy.b.c = "asdf"
    copy.b.d[1] = 4
    expect(src).toEqual(srcValues)
  })

  it("clones circular data", () => {
    const a: any = { foo: "bar" }
    a.baz = a
    const b: any = { foo: "bar" }
    b.baz = b
    expect(clone(a)).toEqual(b)
  })

  it("Clones Map", () => {
    const src = new Map([["foo", "bar"]])

    const copy = clone(src)

    copy.set("foo", "baz")

    expect(src.get("foo")).toEqual("bar")
  })

  it("Clones Set", () => {
    const src = new Set(["foo", "bar"])

    const copy = clone(src)

    copy.add("baz")

    expect(src.has("baz")).toBeFalsy()
  })

  it("circular deps", () => {
    const src = {
      a: 1,
      test: new Map(),
    }
    src.test.set("key", src)

    const copy = clone(src)

    copy.a = 2

    expect(src.a === copy.a).toBeFalsy()
    expect(src.test.get("key") === copy.test.get("key")).toBeFalsy()
  })
})
