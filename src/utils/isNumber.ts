export function isNumber(input: unknown): input is number {
  return typeof input === "number" && !Number.isNaN(input) && Number.isFinite(input)
}
