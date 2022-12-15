import { isString } from "./isString"

function withSuffix(className: string, ...list: any[]): string[] {
  const output = list.filter(isString).map((suffix) => `${suffix}-${className}`)
  void output.unshift(className)
  return output
}
function withPostfix(className: string, ...list: any[]): string[] {
  const output = list.filter(isString).map((postfix) => `${className}-${postfix}`)
  void output.unshift(className)
  return output
}

export function classNames(...list: any[]): string {
  return list.flat().filter(isString).join(" ")
}
classNames.withSuffix = withSuffix
classNames.withPostfix = withPostfix
