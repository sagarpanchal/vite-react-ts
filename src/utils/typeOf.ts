export function typeOf(input: any): string | undefined
export function typeOf(input: any, type?: string): boolean
export function typeOf(input: any, type?: string) {
  if (type) return input?.constructor?.name === (type ?? null)
  return input?.constructor?.name
}
