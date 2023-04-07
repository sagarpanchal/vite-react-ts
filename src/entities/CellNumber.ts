import { parsePhoneNumber, PhoneNumber } from "libphonenumber-js"
import type { CountryCallingCode, NationalNumber, NumberFormat } from "libphonenumber-js"
import metadata from "libphonenumber-js/metadata.full.json"

import { catchError, logInfo } from "utils"

export class CellNumber {
  static identifier = "CellNumber"

  #nationalNumber: NationalNumber
  #countryCallingCode: CountryCallingCode
  #parsedNumber: PhoneNumber

  constructor(public input: string) {
    const { countryCallingCode, nationalNumber } = catchError(
      () => parsePhoneNumber(this.input) ?? {},
      () => ({}),
    )

    this.#nationalNumber = nationalNumber
    this.#countryCallingCode = CellNumber.COUNTRY_CALLING_CODES?.[countryCallingCode]?.[0] ?? countryCallingCode

    this.#parsedNumber = catchError(
      () => new PhoneNumber(this.#countryCallingCode, this.#nationalNumber, metadata),
      () => ({}),
    )

    logInfo({ countryCallingCode, nationalNumber, isValid: this.isValid })
  }

  static get COUNTRIES() {
    return metadata.countries
  }

  static get COUNTRY_CALLING_CODES() {
    return metadata.country_calling_codes
  }

  static isCellNumber(input: unknown): input is CellNumber {
    return input?.constructor === CellNumber
  }

  clone() {
    return new CellNumber(this.input)
  }

  format(type: NumberFormat = "NATIONAL") {
    return catchError(
      () => this.#parsedNumber.format?.(type),
      () => undefined,
    )
  }

  get isPossible() {
    return this.#parsedNumber.isValid?.() ?? false
  }

  get isValid() {
    return this.#parsedNumber.isValid?.() ?? false
  }

  get country() {
    return this.#parsedNumber.country
  }

  get countryCallingCode() {
    return this.#parsedNumber.countryCallingCode
  }

  get nationalNumber() {
    return this.#parsedNumber.nationalNumber
  }

  get number() {
    return this.#parsedNumber.number
  }

  get intl() {
    return this.format("INTERNATIONAL")
  }

  get uri() {
    return this.format("RFC3966")
  }

  toString() {
    return this.number
  }

  valueOf() {
    return this.number
  }
}
