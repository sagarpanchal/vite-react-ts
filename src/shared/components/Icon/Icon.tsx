import { ValueOf } from "type-fest"

import { cx } from "utils"

import { ICON_TYPES } from "./Icon.const"

export interface FontIconProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  type: ValueOf<typeof ICON_TYPES>
}

export function FontIcon(props: FontIconProps) {
  const { type = "box", className, ...rest } = props

  return <i className={cx(cx.withPostfix("bi", type), className)} {...rest} />
}
