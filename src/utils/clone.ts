function baseClone(src: unknown, seen: Map<any, unknown>): unknown
function baseClone(src: any, seen: Map<any, any>): any {
  // Immutable things - null, undefined, functions, symbols, etc.
  if (!src || typeof src !== "object") return src

  // Things we've seen already (circular refs)
  if (seen.has(src)) return seen.get(src)

  // Basic pattern for cloning something below here is:
  // 1. Create copy
  // 2. Add it to `seen` immediately, so we recognize it if we see it in
  //    subordinate members
  // 3. clone subordinate members

  let copy
  if (src.nodeType && "cloneNode" in src) {
    // DOM Node
    copy = src.cloneNode(true)
    seen.set(src, copy)
  } else if (src?.clone instanceof Function) {
    // Built in clone function
    copy = src?.clone?.()
    seen.set(src, copy)
  } else if (src instanceof Date) {
    // Date
    copy = new Date(src.getTime())
    seen.set(src, copy)
  } else if (src instanceof RegExp) {
    // RegExp
    copy = new RegExp(src)
    seen.set(src, copy)
  } else if (Array.isArray(src)) {
    // Array
    copy = new Array(src.length)
    seen.set(src, copy)
    for (let i = 0; i < src.length; i++) copy[i] = baseClone(src[i], seen)
  } else if (src instanceof Map) {
    // Map
    copy = new Map()
    seen.set(src, copy)
    for (const [k, v] of src.entries()) copy.set(k, baseClone(v, seen))
  } else if (src instanceof Set) {
    // Set
    copy = new Set()
    seen.set(src, copy)
    for (const v of src) copy.add(baseClone(v, seen))
  } else if (src instanceof Object) {
    // Object
    copy = Object.assign(Object.create(Object.getPrototypeOf(src)), src)
    seen.set(src, copy)
    for (const [k, v] of Object.entries(src)) copy[k] = baseClone(v, seen)
  } else {
    // Unrecognized thing.  It's better to throw here than to return `src`, as
    // we don't know whether src needs to be deep-copied here.
    throw Error(`Unable to clone ${src}`)
  }

  return copy
}

export function clone<T>(src?: T): T
export function clone(src?: any): any {
  const seen: Map<any, any> = new Map()
  return baseClone(src, seen)
}
