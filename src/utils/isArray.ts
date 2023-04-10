export function isArray<T = unknown>(input: unknown | T[]): input is T[] {
  return Array.isArray(input)
}
