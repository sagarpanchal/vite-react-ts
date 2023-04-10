export interface IsEmptyOptions {
  isEmpty?: any[]
  isNotEmpty?: any[]
}

export function isEmpty(input: any, options: IsEmptyOptions = {}): boolean {
  options = { isEmpty: [], isNotEmpty: [], ...options } as IsEmptyOptions

  if (options.isEmpty?.includes?.(input)) return true
  if (options.isNotEmpty?.includes?.(input)) return false
  if ([undefined, null].includes(input)) return true

  if (Array.isArray(input)) return !input.length
  if (input?.constructor === Object) return !Object.keys(input).length
  if (typeof input === "number") return Number.isNaN(input) || !Number.isFinite(input)
  if (typeof input === "string") return !input.trim().length

  return false
}
