function baseClone(src: unknown, seen: WeakMap<any, unknown>): unknown
function baseClone(src: any, seen: WeakMap<any, any>): any {
  // Things we've seen already (circular refs)
  if (seen.has(src)) return seen.get(src)

  // Basic pattern for cloning something below here is:
  // 1. Create copy
  // 2. Add it to `seen` immediately, so we recognize it if we see it in
  //    subordinate members
  // 3. clone subordinate members

  let copy

  if (src?.nodeType && "cloneNode" in src) {
    // DOM Node
    copy = src?.cloneNode?.(true)
    seen.set(src, copy)
    return copy
  }

  if (src?.clone instanceof Function) {
    // DOM Node
    copy = src?.clone?.()
    seen.set(src, copy)
    return copy
  }

  if (src instanceof Date) {
    // Date
    copy = new Date(src?.getTime?.())
    seen.set(src, copy)
    return copy
  }

  if (src instanceof RegExp) {
    // RegExp
    copy = new RegExp(src)
    seen.set(src, copy)
    return copy
  }

  if (Array.isArray(src)) {
    // Array
    copy = new Array(src?.length)
    for (let i = 0; i < src?.length; i++) copy[i] = baseClone(src[i], seen)
    seen.set(src, copy)
    return copy
  }

  if (src instanceof Map) {
    // Map
    copy = new Map()
    for (const [k, v] of src?.entries?.() ?? []) copy.set(k, baseClone(v, seen))
    seen.set(src, copy)
    return copy
  }

  if (src instanceof Set) {
    // Set
    copy = new Set()
    for (const v of src) copy.add(baseClone(v, seen))
    seen.set(src, copy)
    return copy
  }

  if (src instanceof Object) {
    // Object
    copy = Object.assign(Object.create(Object.getPrototypeOf(src)), src)
    for (const [k, v] of Object.entries(src)) copy[k] = baseClone(v, seen)
    seen.set(src, copy)
    return copy
  }

  return src
}

export function clone<T>(src: T): T
export function clone(src: any): any {
  const seen: WeakMap<any, any> = new WeakMap()
  return baseClone(src, seen)
}
