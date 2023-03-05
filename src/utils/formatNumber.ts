import { castToNumber } from "./castToNumber"
import { isNumber } from "./isNumber"
import { LOCALE } from "./utils.constants"

export interface FormatNumberOptions extends Intl.NumberFormatOptions {
  locale?: string
  fractionLength?: number
}

export function formatNumber(input: unknown, options: FormatNumberOptions | number = {}): string | undefined {
  input = castToNumber(input)
  if (!isNumber(input)) return undefined

  options = (isNumber(options) ? { fractionLength: options } : options) as FormatNumberOptions
  options.fractionLength = options.fractionLength ?? `${input}`.split(".")?.[1]?.length ?? 0
  options.locale = options.locale ?? LOCALE

  const { locale, fractionLength, ...restOptions } = options

  return new Intl.NumberFormat(locale, {
    maximumFractionDigits: fractionLength,
    minimumFractionDigits: fractionLength,
    ...restOptions,
  }).format(input as number)
}
