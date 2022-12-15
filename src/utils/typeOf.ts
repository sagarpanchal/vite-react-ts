export function typeOf(input: any, type?: string): boolean {
  if (type) return input?.constructor?.name === (type ?? null)
  return input?.constructor?.name
}
