import React from "react"

import { ListView } from "components/ListView/ListView"

import { cx } from "utils"

export default function App() {
  return (
    <React.Fragment>
      <ListView />
      <div className={cx("container-fluid")}>
        <span>
          React.<small>js</small>
        </span>
      </div>
    </React.Fragment>
  )
}
