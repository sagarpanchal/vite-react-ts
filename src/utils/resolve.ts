import React from "react"

import { hasKey } from "./hasKey"
import { isFunction } from "./isFunction"

type TCallBack<T> = (...args: any[]) => T

export function resolve<T>(v: TCallBack<T>): T
export function resolve<T extends HTMLInputElement>(v: React.FormEvent<T>): Pick<T, "value">
export function resolve<T>(v: T): T

export function resolve(input: any, ...args: any[]): any {
  if (isFunction(input)) return input(...args)
  if (hasKey(input, "target")) return input.target.value

  return input
}
