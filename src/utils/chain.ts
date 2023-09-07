export function chain<T>(object: T) {
  const call =
    <V>(previousResult: V) =>
    <U>(callback: (object: T, result: V) => U) => {
      const result = callback(object, previousResult)
      return { call: call(result), result: () => result }
    }

  return { call: call(undefined) }
}
