export function isDevEnv(mode = import.meta.env.MODE): mode is "development" {
  return mode === "development"
}
