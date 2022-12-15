import { logWarn } from "./logWarn"

// Object.seal(input);
// Object.preventExtensions(input);

export function freeze(input: any): boolean {
  try {
    Object.freeze(input)
    return true
  } catch (error) {
    logWarn(error)
  }

  return false
}

export function deepFreeze(input: any): boolean {
  try {
    freeze(input)

    Object.getOwnPropertyNames(input).forEach((prop) => {
      try {
        if (!Object.isFrozen(input[prop])) {
          deepFreeze(input[prop])
        }
      } catch (e) {
        logWarn(e)
      }
    })

    return true
  } catch (error) {
    logWarn(error)
  }

  return false
}
