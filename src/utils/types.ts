export type ValueOf<T> = T[keyof T]

export type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U

export type Cons<H, T> = T extends readonly any[]
  ? ((h: H, ...t: T) => void) extends (...r: infer R) => void
    ? R
    : never
  : never

export type GenericObject = {
  [k: string | number | symbol]: GenericObject | unknown
}

export type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[]
  ? ElementType
  : never
