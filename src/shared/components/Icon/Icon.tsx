import { ValueOf } from "utils/types"

import { cx } from "utils"

import { ICON_TYPES } from "./Icon.const"

type TFontIconProps = {
  icon: ValueOf<typeof ICON_TYPES>
}

export function FontIcon(props: TFontIconProps) {
  const { icon = "box" } = props

  return <i className={cx(cx.withPostfix("bi", icon))} />
}
