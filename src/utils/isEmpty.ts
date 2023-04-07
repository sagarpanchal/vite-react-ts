export interface IsEmptyOptions {
  isEmpty?: any[]
  isNotEmpty?: any[]
}

export function isEmpty(input: any, options: IsEmptyOptions = {}): boolean {
  options = { isEmpty: [], isNotEmpty: [], ...options } as IsEmptyOptions

  if (options.isEmpty?.includes?.(input)) return true
  if (options.isNotEmpty?.includes?.(input)) return false
  if ([undefined, null].includes(input)) return true

  if (input?.constructor?.name === "Array") return !input.length
  if (input?.constructor?.name === "Number") return Number.isNaN(input) || !Number.isFinite(input)
  if (input?.constructor?.name === "Object") return !Object.keys(input).length
  if (input?.constructor?.name === "String") return !input.trim().length

  return false
}
