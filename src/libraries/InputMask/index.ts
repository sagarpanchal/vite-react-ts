/* eslint-disable @typescript-eslint/ban-ts-comment */
import Inputmask from "inputmask"
// @ts-ignore
import InputmaskPhoneExt from "inputmask.phone/dist/inputmask.phone/inputmask.phone.extensions"

import { PhoneCode, PHONE_CODES } from "./phone-codes"

const phoneCodes = PHONE_CODES.map((code) => {
  const phoneCode = { ...code } as PhoneCode
  phoneCode.mask = phoneCode.mask.replace(/(\(|-)/, " ")
  phoneCode.mask = phoneCode.mask.replaceAll(/(\(|\)|-)/g, "")
  return phoneCode
})

// @ts-ignore
Inputmask.extendAliases({ phone: { alias: "abstractphone", phoneCodes } })
Inputmask.extendAliases({ abstractphone: InputmaskPhoneExt.prototype.aliases.abstractphone })

export const InputMask = Inputmask
