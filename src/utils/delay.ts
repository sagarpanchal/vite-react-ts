export function delay(ms = 100): Promise<undefined> {
  return new Promise((r) => setTimeout(r, ms))
}
