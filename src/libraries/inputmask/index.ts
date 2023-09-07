/* eslint-disable @typescript-eslint/ban-ts-comment */
import type inputmask from "inputmask"
// @ts-ignore
import mask from "inputmask/lib/inputmask"

// @ts-ignore
import { maskPhoneFactory } from "./inputmask-phone"
// @ts-ignore
import { PhoneCode, PHONE_CODES } from "./phone-codes"

const phoneCodes = PHONE_CODES.map((code) => {
  const phoneCode = { ...code } as PhoneCode
  phoneCode.mask = phoneCode.mask.replace(/(\(|-)/, " ")
  phoneCode.mask = phoneCode.mask.replaceAll(/(\(|\)|-)/g, "")
  return phoneCode
})

const InputmaskPhoneExt = maskPhoneFactory(mask)

// @ts-ignore
mask.extendAliases({ phone: { alias: "abstractphone", phoneCodes } })
mask.extendAliases({ abstractphone: InputmaskPhoneExt.prototype.aliases.abstractphone })

export const Inputmask: typeof inputmask = mask
