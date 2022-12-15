export function typeOf(input: any, type: string): boolean {
  return input?.constructor?.name === (type ?? null)
}
