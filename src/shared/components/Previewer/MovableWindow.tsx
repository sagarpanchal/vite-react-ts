import React from "react"

import { cx } from "utils"

import styles from "./Previewer.module.scss"
import { dragWindow } from "./Previewer.utils"

type MovableWindowProps = {
  title?: React.ReactNode
  children?: React.ReactNode
}

export function MovableWindow(props: MovableWindowProps) {
  const { title, children } = props
  const windowRef = React.useRef<HTMLDivElement>(document.createElement("div"))
  const titlebarRef = React.useRef<HTMLDivElement>(document.createElement("div"))

  React.useLayoutEffect(() => {
    const window = windowRef.current
    const titlebar = titlebarRef.current
    if (window && titlebar) return dragWindow(titlebar, window)
  })

  return (
    <div tabIndex={0} ref={windowRef} className={cx("card", styles["previewer-window"])}>
      <div tabIndex={0} ref={titlebarRef} className={cx("card-header", styles["previewer-window-titlebar"])}>
        {title}
      </div>
      <div tabIndex={0} className={cx("card-body", styles["previewer-window-body"])}>
        {children}
      </div>
    </div>
  )
}
