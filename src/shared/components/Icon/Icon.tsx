import { Overwrite, ValueOf } from "utils/types"

import { cx } from "utils"

import { ICON_TYPES } from "./Icon.const"

type TFontIconProps = Overwrite<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>,
  {
    type: ValueOf<typeof ICON_TYPES>
  }
>

export function FontIcon(props: TFontIconProps) {
  const { type = "box", className } = props

  return <i className={cx(cx.withPostfix("bi", type), className)} />
}
