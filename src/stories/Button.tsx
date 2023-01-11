import { FontIcon } from "shared/components/Icon"

import { cx } from "utils"

interface ButtonProps {
  variant?: "primary" | "secondary" | "success" | "danger" | "warning" | "info"
  outlined?: boolean
  size?: "sm" | "md" | "lg"
  label: string
  onClick?: () => void
}

export const Button = (props: ButtonProps) => {
  const { variant = "primary", size = "md", outlined, label, ...restProps } = props

  const mode = outlined ? `outline-${variant}` : variant

  return (
    <button className={cx(cx.withPostfix("btn", mode, size))} {...restProps}>
      <FontIcon type="play-fill" /> {label}
    </button>
  )
}
