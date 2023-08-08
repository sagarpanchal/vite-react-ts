import React from "react"

import { useRegisterSW } from "virtual:pwa-register/react"

import { cx } from "utils"

import styles from "./ReloadPrompt.module.scss"

export function ReloadPrompt() {
  const updateIntervalIdRef = React.useRef<NodeJS.Timer>()

  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered: (registration) => {
      console.info(`SW Registered: ${registration}`)

      clearInterval(updateIntervalIdRef.current)
      if (registration) {
        updateIntervalIdRef.current = setInterval(() => {
          registration.update()
        }, 60 * 60 * 1000)
      }
    },
    onRegisterError: (error) => {
      clearInterval(updateIntervalIdRef.current)
      console.info(`SW registration error${error}`)
    },
  })

  const close = React.useCallback(() => {
    setNeedRefresh(false)
    setTimeout(() => setNeedRefresh(true), 60 * 60 * 1000)
  }, [setNeedRefresh])

  return (
    <div className={cx("p-3", styles["reload-prompt-container"])}>
      {needRefresh && (
        <div className={cx("card")}>
          <div className={cx("card-body")}>
            <p className={cx("card-text")}>
              Update available, click <div className="badge bg-primary">Reload</div> to update.
            </p>
            <div className="hstack justify-content-end">
              <button className={cx("btn btn-sm btn-primary me-2")} onClick={() => updateServiceWorker(true)}>
                Reload
              </button>
              <button className={cx("btn btn-sm btn-outline-secondary")} onClick={() => close()}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
