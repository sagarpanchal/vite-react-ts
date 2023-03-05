import React from "react"

import { useEnum } from "hooks"
import { cx } from "utils"

import styles from "./Previewer.module.scss"
import { getDOMMatrix, panZoom } from "./Previewer.utils"

function SelectSvg() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
      <path
        d="M 4.346 2.449 C 3.173 2.058 2.058 3.173 2.449 4.346 L 6.232 15.697 C 6.585 16.755 7.928 17.072 8.716 16.284 L 16.284 8.716 C 17.072 7.928 16.755 6.585 15.697 6.232 Z"
        fill="currentColor"
      />
      <path d="M 12 12 L 16.5 16.5" fill="transparent" strokeWidth="2" stroke="currentColor" strokeLinecap="round" />
    </svg>
  )
}

function PanSvg() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="20">
      <path
        d="M 9.077 18.462 C 12.63 19.251 16 16.548 16 12.908 L 16 5 C 16 4.448 15.552 4 15 4 L 15 4 C 14.448 4 14 4.448 14 5 L 14 8 L 14 8.5 C 14 8.776 13.776 9 13.5 9 L 13.5 9 C 13.224 9 13 8.776 13 8.5 L 13 3 C 13 2.448 12.552 2 12 2 L 12 2 C 11.448 2 11 2.448 11 3 L 11 8.5 C 11 8.776 10.776 9 10.5 9 L 10.5 9 C 10.224 9 10 8.776 10 8.5 L 10 2 C 10 1.448 9.552 1 9 1 L 9 1 C 8.448 1 8 1.448 8 2 L 8 8.5 C 8 8.776 7.776 9 7.5 9 L 7.5 9 C 7.224 9 7 8.776 7 8.5 L 7 4 C 7 3.448 6.552 3 6 3 L 6 3 C 5.448 3 5 3.448 5 4 L 5 10 L 5 10.463 C 5 10.991 4.343 11.234 4 10.833 L 2.813 9.449 C 2.356 8.915 1.563 8.828 1 9.25 L 1 9.25 C 0.46 9.655 0.379 10.433 0.823 10.941 L 5.705 16.52 C 6.546 17.482 7.672 18.149 8.919 18.426 Z"
        fill="currentColor"
      />
    </svg>
  )
}

function ResetSvg() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="20" viewBox="0 0 512 512">
      <path
        d="M0 224c0 17.7 14.3 32 32 32s32-14.3 32-32c0-53 43-96 96-96H320v32c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l64-64c12.5-12.5 12.5-32.8 0-45.3l-64-64c-9.2-9.2-22.9-11.9-34.9-6.9S320 19.1 320 32V64H160C71.6 64 0 135.6 0 224zm512 64c0-17.7-14.3-32-32-32s-32 14.3-32 32c0 53-43 96-96 96H192V352c0-12.9-7.8-24.6-19.8-29.6s-25.7-2.2-34.9 6.9l-64 64c-12.5 12.5-12.5 32.8 0 45.3l64 64c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6V448H352c88.4 0 160-71.6 160-160z"
        fill="currentColor"
      />
    </svg>
  )
}

interface PreviewerProps {
  children?: React.ReactNode
  initialScale?: number
}

export function Previewer(props: PreviewerProps) {
  const { children, initialScale = 1 } = props

  const overlayRef = React.useRef<HTMLDivElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const interactionModes = { select: "select", pan: "pan" }
  const [mode, switchModeTo] = useEnum(interactionModes.pan, interactionModes)
  const [, setCount] = React.useState(0)

  const applyPanZoom = React.useCallback(
    ({ reset = false } = {}) => {
      const overlay = overlayRef.current as HTMLDivElement
      const container = containerRef.current as HTMLDivElement

      if (overlay && container) {
        const Matrix = getDOMMatrix()
        if (!Matrix) return

        container.style.transform =
          reset || !container.style.transform ? new Matrix().scale(initialScale).toString() : container.style.transform

        const position = {
          x: -(overlay.clientHeight / (2 * initialScale)) + 16,
          y: -(overlay.clientWidth / (2 * initialScale)) + 16,
          applyToNode(el: HTMLElement) {
            if (!(el instanceof HTMLElement)) return
            el.style.top = reset || !el.style.top ? `${this.x}px` : el.style.top
            el.style.left = reset || !el.style.left ? `${this.y}px` : el.style.left
            this.y += el.clientWidth + 16
          },
          applyToNodeList(nodeList: NodeList) {
            nodeList.forEach((el) => this.applyToNode(el as HTMLDivElement))
          },
        }

        position.applyToNodeList(container.childNodes)

        if (!reset) {
          return panZoom(overlay, container)
        }
      }
    },
    [initialScale],
  )

  const handleReset = React.useCallback(() => {
    setCount((count) => 1 + count)
    applyPanZoom({ reset: true })
  }, [applyPanZoom])

  React.useEffect(() => {
    return applyPanZoom()
  })

  return (
    <div className={cx(styles["previewer"])}>
      <div
        ref={overlayRef}
        className={cx(styles["previewer-overlay"], mode.is.pan && styles["previewer-overlay-visible"])}
      />
      <div ref={containerRef} className={cx(styles["previewer-content"])}>
        {children}
      </div>
      <div className={cx("btn-group", styles["previewer-controls"])} role="group" aria-label="controls">
        <button
          role="button"
          title="Switch to select mode"
          aria-label="Switch to select mode"
          className={cx("btn btn-secondary", mode.is.select && "active")}
          onClick={switchModeTo.select}
        >
          <SelectSvg />
        </button>
        <button
          role="button"
          title="Switch to pan mode"
          aria-label="Switch to pan mode"
          className={cx("btn btn-secondary", mode.is.pan && "active")}
          onClick={switchModeTo.pan}
        >
          <PanSvg />
        </button>
        <button
          role="button"
          title="Reset"
          aria-label="Reset"
          className={cx("btn btn-secondary")}
          onClick={handleReset}
        >
          <ResetSvg />
        </button>
      </div>
    </div>
  )
}
