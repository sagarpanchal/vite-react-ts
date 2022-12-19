import React from "react"

import colors from "tailwindcss/colors"

import { cx } from "utils"

import styles from "./Button.module.scss"

interface ButtonProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  color?: keyof typeof colors
}

export function Button(props: ButtonProps) {
  const { className, color = "secondary", ...rest } = props
  return <button className={cx(styles["button"], styles[`button-${color}`], className)} {...rest} />
}
