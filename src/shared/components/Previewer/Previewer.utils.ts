import zoomer from "libraries/zoomer"

export function dragWindow(listenFromElement: HTMLElement, applyToElement: HTMLElement) {
  listenFromElement.setAttribute("draggable", "false")
  applyToElement.setAttribute("draggable", "false")
  applyToElement.style.position = "absolute"

  const cursorPosition = {
    x: 0,
    y: 0,
    set(e: MouseEvent) {
      this.x = e.clientX
      this.y = e.clientY
    },
  }
  function documentMouseMoveSetPosition(e: MouseEvent) {
    e.preventDefault()
    const acceleration = applyToElement.getBoundingClientRect().width / applyToElement.offsetWidth // scale
    applyToElement.style.left = `${applyToElement.offsetLeft - (cursorPosition.x - e.clientX) / acceleration}px`
    applyToElement.style.top = `${applyToElement.offsetTop - (cursorPosition.y - e.clientY) / acceleration}px`
    cursorPosition.set(e)
  }

  function documentMouseRemoveListeners() {
    // stop moving when mouse button is released
    document.removeEventListener("mouseup", documentMouseRemoveListeners)
    document.removeEventListener("mousemove", documentMouseMoveSetPosition)
  }

  function elementMouseDownAddListeners(e: MouseEvent) {
    e.preventDefault()
    cursorPosition.set(e)
    document.addEventListener("mouseup", documentMouseRemoveListeners)
    document.addEventListener("mousemove", documentMouseMoveSetPosition)
  }

  listenFromElement.addEventListener("mousedown", elementMouseDownAddListeners)

  return () => {
    listenFromElement.removeEventListener("mousedown", elementMouseDownAddListeners)
    document.removeEventListener("mouseup", documentMouseRemoveListeners)
    document.removeEventListener("mousemove", documentMouseMoveSetPosition)
  }
}

export const panZoom = zoomer.applyPanZoom

export const getDOMMatrix = zoomer.getDOMMatrix
