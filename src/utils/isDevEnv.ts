export function isDevEnv(): boolean {
  return import.meta.env.MODE === "development"
}
