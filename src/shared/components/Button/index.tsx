import React from "react"

import { cx } from "utils"

import styles from "./Button.module.scss"

export default function Button(
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
) {
  const { className, ...rest } = props
  return <button className={cx(styles["button"], className)} {...rest} />
}
