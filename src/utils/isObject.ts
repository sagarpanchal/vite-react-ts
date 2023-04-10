export function isObject(input: unknown): boolean {
  return input?.constructor === Object
}
