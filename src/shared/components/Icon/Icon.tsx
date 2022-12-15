import { ValueOf } from "utils/types"

import { cx } from "utils"

import { ICON_TYPES } from "./Icon.const"

type TFontIconProps = {
  type: ValueOf<typeof ICON_TYPES>
}

export function FontIcon(props: TFontIconProps) {
  const { type = "box" } = props

  return <i className={cx("bi", `bi-${type}`)} />
}
