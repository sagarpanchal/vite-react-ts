import type { FormatNumberOptions, NumberFormat, PhoneNumber } from "libphonenumber-js"
import { AsYouType } from "libphonenumber-js"
// import metadata from "libphonenumber-js/metadata.full.json"

import { catchError, chain } from "utils"

export class CellNumber {
  static identifier = "CellNumber"

  #input: string
  #asYouType = new AsYouType()
  #phoneNumber?: PhoneNumber

  constructor(input: string) {
    this.#input = input
    this.#phoneNumber = chain(this.#asYouType)
      .call((i) => i.input(input))
      .call((i) => i.getNumber())
      .result()
  }

  // static get COUNTRIES() {
  //   return metadata.countries
  // }

  // static get COUNTRY_CALLING_CODES() {
  //   return metadata.country_calling_codes
  // }

  static isCellNumber(input: unknown): input is CellNumber {
    return input?.constructor === CellNumber
  }

  clone() {
    return new CellNumber(this.#input)
  }

  format(type: NumberFormat = "NATIONAL", options?: FormatNumberOptions) {
    return catchError(
      () => this.#phoneNumber?.format?.(type, options),
      () => undefined,
    )
  }

  get isPossible() {
    return this.#asYouType.isPossible()
  }

  get isValid() {
    return this.#asYouType.isValid()
  }

  get country() {
    return this.#asYouType.getCountry()
  }

  get countryCallingCode() {
    return this.#asYouType.getCallingCode()
  }

  get nationalNumber() {
    return this.#asYouType.getNationalNumber()
  }

  get intl() {
    return this.format("INTERNATIONAL")
  }

  get uri() {
    return this.format("RFC3966")
  }

  toString() {
    return this.#input
  }

  valueOf() {
    return this.#input
  }
}
