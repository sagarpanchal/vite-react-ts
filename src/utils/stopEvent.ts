import React from "react"

export function stopEvent(event?: React.SyntheticEvent | Event) {
  void event?.preventDefault?.()
  void event?.stopPropagation?.()
}
