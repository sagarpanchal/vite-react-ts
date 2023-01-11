import { useSelector } from "react-redux"

import { RootState } from "redux/store"
import { cx } from "utils"

import styles from "./Loader.module.scss"

export function Loader(props: { loading: boolean }) {
  const { loading } = props

  return (
    <div className={cx(styles["loader"], loading && styles["loader-visible"])}>
      <div className={cx(styles["loader-overlay"])} />
      <div className={cx(styles["loader-spinner"], "spinner-border")} role="status"></div>
      <span className="visually-hidden">Loading...</span>
    </div>
  )
}

export function GlobalLoader() {
  const loading = useSelector((state: RootState) => Boolean(state.loader.count))
  return <Loader loading={loading} />
}
