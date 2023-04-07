import React from "react"

import Inputmask from "inputmask"

import { InputMask } from "libraries/InputMask"
import { INPUT_MASKS } from "libraries/InputMask/input-masks"
import { catchError, isString } from "utils"

type Props = React.ComponentProps<"input"> & {
  mask?: keyof typeof INPUT_MASKS | Inputmask.Options
}

export const MaskedInput = React.memo(
  React.forwardRef<HTMLInputElement | null, Props>((props, ref) => {
    const { mask, ...rest } = props

    const [inputRef, setInputRef] = React.useState<HTMLInputElement | null>(null)
    React.useImperativeHandle<HTMLInputElement | null, HTMLInputElement | null>(ref, () => inputRef, [inputRef])

    React.useLayoutEffect(() => {
      if (inputRef instanceof HTMLInputElement) {
        const inputMask = new InputMask(isString(mask) ? INPUT_MASKS[mask] : mask)
        catchError(() => inputMask.mask(inputRef))
        return () => {
          catchError(() => inputMask.remove())
        }
      }
    }, [inputRef, mask])

    return <input ref={setInputRef} {...rest} />
  }),
)

MaskedInput.displayName = "MaskedInput"
