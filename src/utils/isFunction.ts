export function isFunction(input: unknown): input is (...args: unknown[]) => unknown {
  return typeof input === "function"
}
