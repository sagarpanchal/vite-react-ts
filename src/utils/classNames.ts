import { isString } from "./isString"

function withPseudo(prefix: string, ...list: any[]): string[] {
  const output = list.filter(isString).map((className) => `${prefix}:${className}`)
  return output
}

function withPrefix(className: string, ...list: any[]): string[] {
  const output = list.filter(isString).map((prefix) => `${prefix}-${className}`)
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
classNames.withPseudo = withPseudo
classNames.withPrefix = withPrefix
classNames.withPostfix = withPostfix
