declare global {
  /*
    TouchEvent' `scale` and `rotation` properties aren't standardized:
    https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent
  */
  interface TouchEvent {
    scale?: number
    rotation?: number
  }

  /*
    GestureEvents aren't standardized:
    https://developer.mozilla.org/en-US/docs/Web/API/GestureEvent
    https://developer.apple.com/documentation/webkitjs/gestureevent
  */
  interface GestureEvent extends UIEvent {
    altKey: boolean
    ctrlKey: boolean
    metaKey: boolean
    shiftKey: boolean
    scale: number
    rotation: number
    clientX: number
    clientY: number
    screenX: number
    screenY: number
  }

  // extends the original ElementEventMap
  interface ElementEventMap {
    gesturestart: GestureEvent
    gesturechange: GestureEvent
    gestureend: GestureEvent
  }

  // required to check for its existence
  interface Window {
    GestureEvent?: GestureEvent
  }
}

const WHEEL_SCALE_SPEEDUP = 2
const WHEEL_TRANSLATION_SPEEDUP = 2
const DELTA_LINE_MULTIPLIER = 8
const DELTA_PAGE_MULTIPLIER = 24
const MAX_WHEEL_DELTA = 24

function limit(delta: number, maxDelta: number) {
  return Math.sign(delta) * Math.min(maxDelta, Math.abs(delta))
}

function normalizeWheel(e: WheelEvent) {
  let dx = e.deltaX
  let dy = e.deltaY

  if (e.shiftKey && dx === 0) {
    ;[dx, dy] = [dy, dx]
  }

  if (e.deltaMode === WheelEvent.DOM_DELTA_LINE) {
    dx *= DELTA_LINE_MULTIPLIER
    dy *= DELTA_LINE_MULTIPLIER
  } else if (e.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
    dx *= DELTA_PAGE_MULTIPLIER
    dy *= DELTA_PAGE_MULTIPLIER
  }

  return [limit(dx, MAX_WHEEL_DELTA), limit(dy, MAX_WHEEL_DELTA)]
}

function midpoint(touches: TouchEvent["touches"]) {
  const [t1, t2] = touches

  return {
    x: (t1.clientX + t2.clientX) / 2,
    y: (t1.clientY + t2.clientY) / 2,
  }
}

function distance(touches: TouchEvent["touches"]) {
  const [t1, t2] = touches

  return Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY)
}

function angle(touches: TouchEvent["touches"]) {
  const [t1, t2] = touches

  const dx = t2.clientX - t1.clientX
  const dy = t2.clientY - t1.clientY

  return (Math.atan2(dy, dx) * 180) / Math.PI
}

export interface ZoomerWheelGesture {
  scale: number
  rotation?: number | undefined
  origin: { x: number; y: number }
  translation: { x: number; y: number }
}

export interface ZoomerTouchGesture {
  scale: number | undefined
  rotation: number | undefined
  translation: { x: number; y: number }
  origin: { x: number; y: number }
}

function zoomer(
  container: HTMLElement,
  options?: {
    onGestureStart?: (gesture: ZoomerWheelGesture | ZoomerTouchGesture) => void
    onGestureChange?: (gesture: ZoomerWheelGesture | ZoomerTouchGesture) => void
    onGestureEnd?: (gesture: ZoomerWheelGesture | ZoomerTouchGesture) => void
  },
) {
  const cursorPosition = {
    x: 0,
    y: 0,
    set(e: MouseEvent | WheelEvent) {
      this.x = e.clientX
      this.y = e.clientY
    },
  }

  const onGestureStart = options?.onGestureStart ?? (() => undefined)
  const onGestureChange = options?.onGestureChange ?? (() => undefined)
  const onGestureEnd = options?.onGestureEnd ?? (() => undefined)

  let timer: number
  let wheelGesture: ZoomerWheelGesture | null = null

  function getDefaultGesture(e: MouseEvent | WheelEvent) {
    return {
      origin: { x: e.clientX, y: e.clientY },
      scale: 1,
      translation: { x: 0, y: 0 },
    }
  }

  function wheelListener(e: WheelEvent) {
    if (e.cancelable !== false) e.preventDefault()

    const [dx, dy] = normalizeWheel(e)

    if (!wheelGesture) {
      wheelGesture = getDefaultGesture(e)
      onGestureStart(wheelGesture)
    }

    if (e.ctrlKey) {
      // pinch-zoom gesture
      const factor = dy <= 0 ? 1 - (WHEEL_SCALE_SPEEDUP * dy) / 100 : 1 / (1 + (WHEEL_SCALE_SPEEDUP * dy) / 100)

      wheelGesture = {
        origin: { x: e.clientX, y: e.clientY },
        scale: wheelGesture.scale * factor,
        translation: wheelGesture.translation,
      }
    } else {
      // pan gesture
      wheelGesture = {
        origin: { x: e.clientX, y: e.clientY },
        scale: wheelGesture.scale,
        translation: {
          x: wheelGesture.translation.x - WHEEL_TRANSLATION_SPEEDUP * dx,
          y: wheelGesture.translation.y - WHEEL_TRANSLATION_SPEEDUP * dy,
        },
      }
    }

    onGestureChange(wheelGesture)

    if (timer) window.clearTimeout(timer)

    timer = window.setTimeout(() => {
      if (wheelGesture) {
        onGestureEnd(wheelGesture)
        wheelGesture = null
      }
    }, 200)
  }

  let initialTouched: TouchEvent["touches"]
  let touchGesture: ZoomerTouchGesture | null = null
  function touchMoveListener(e: TouchEvent) {
    if (e.touches.length === 2) {
      const initialTouchMidpoint = midpoint(initialTouched)
      const currentTouchMidpoint = midpoint(e.touches)

      touchGesture = {
        scale: e.scale !== undefined ? e.scale : distance(e.touches) / distance(initialTouched),
        rotation: e.rotation !== undefined ? e.rotation : angle(e.touches) - angle(initialTouched),
        translation: {
          x: currentTouchMidpoint.x - initialTouchMidpoint.x,
          y: currentTouchMidpoint.y - initialTouchMidpoint.y,
        },
        origin: initialTouchMidpoint,
      }

      onGestureChange(touchGesture)

      if (e.cancelable !== false) e.preventDefault()
    }
  }

  function touchListener(e: TouchEvent) {
    if (e.touches.length === 2) {
      initialTouched = e.touches
      touchGesture = {
        scale: 1,
        rotation: 0,
        translation: { x: 0, y: 0 },
        origin: midpoint(initialTouched),
      }

      if (e.type === "touchstart" && e.cancelable !== false) e.preventDefault()

      onGestureStart(touchGesture)

      container.addEventListener("touchmove", touchMoveListener, { passive: false })
      container.addEventListener("touchend", touchListener)
      container.addEventListener("touchcancel", touchListener)
    } else if (touchGesture) {
      onGestureEnd(touchGesture)
      touchGesture = null

      container.removeEventListener("touchmove", touchMoveListener)
      container.removeEventListener("touchend", touchListener)
      container.removeEventListener("touchcancel", touchListener)
    }
  }

  let inGesture = false
  function gestureStartListener(e: GestureEvent) {
    if (!inGesture) {
      onGestureStart({
        translation: { x: 0, y: 0 },
        scale: e.scale,
        rotation: e.rotation,
        origin: { x: e.clientX, y: e.clientY },
      })
      inGesture = true
    }

    if (e.cancelable !== false) e.preventDefault()
  }
  function gestureChangeListener(e: GestureEvent) {
    if (inGesture) {
      onGestureChange({
        translation: { x: 0, y: 0 },
        scale: e.scale,
        rotation: e.rotation,
        origin: { x: e.clientX, y: e.clientY },
      })
    }

    if (e.cancelable !== false) e.preventDefault()
  }
  function gestureEndListener(e: GestureEvent) {
    if (inGesture) {
      onGestureEnd({
        translation: { x: 0, y: 0 },
        scale: e.scale,
        rotation: e.rotation,
        origin: { x: e.clientX, y: e.clientY },
      })
      inGesture = false
    }
  }

  function documentMouseMoveListener(e: MouseEvent) {
    if (e.cancelable !== false) e.preventDefault()

    if (!wheelGesture) {
      wheelGesture = getDefaultGesture(e)
      onGestureStart(wheelGesture)
    }

    wheelGesture = {
      origin: { x: e.clientX, y: e.clientY },
      scale: wheelGesture?.scale,
      translation: {
        x: wheelGesture.translation.x - (cursorPosition.x - e.clientX) / wheelGesture.scale,
        y: wheelGesture.translation.y - (cursorPosition.y - e.clientY) / wheelGesture.scale,
      },
    }

    onGestureChange(wheelGesture)
    cursorPosition.set(e)
  }

  function documentMouseUpListener() {
    // stop moving when mouse button is released
    document.removeEventListener("mouseup", documentMouseUpListener)
    document.removeEventListener("mousemove", documentMouseMoveListener)
  }

  function elementMouseDownListener(e: MouseEvent) {
    e.preventDefault()
    cursorPosition.set(e)
    document.addEventListener("mouseup", documentMouseUpListener)
    document.addEventListener("mousemove", documentMouseMoveListener)
  }

  container.addEventListener("wheel", wheelListener, { passive: false })
  container.addEventListener("touchstart", touchListener, { passive: false })

  if (typeof window.GestureEvent !== "undefined" && typeof window.TouchEvent === "undefined") {
    container.addEventListener("gesturestart", gestureStartListener, { passive: false })
    container.addEventListener("gesturechange", gestureChangeListener, { passive: false })
    container.addEventListener("gestureend", gestureEndListener)
  }

  container.addEventListener("mousedown", elementMouseDownListener)

  return () => {
    container.addEventListener("wheel", wheelListener)

    container.addEventListener("touchstart", touchListener)
    container.addEventListener("touchmove", touchMoveListener)
    container.addEventListener("touchend", touchListener)
    container.addEventListener("touchcancel", touchListener)

    container.addEventListener("gesturestart", gestureStartListener)
    container.addEventListener("gesturechange", gestureChangeListener)
    container.addEventListener("gestureend", gestureEndListener)

    container.removeEventListener("mousedown", elementMouseDownListener)

    document.removeEventListener("mouseup", documentMouseUpListener)
    document.removeEventListener("mousemove", documentMouseMoveListener)
  }
}

function gestureToMatrix(gesture: ZoomerWheelGesture | ZoomerTouchGesture, origin: ZoomerWheelGesture["origin"]) {
  return new DOMMatrix()
    .translate(origin.x, origin.y)
    .translate(gesture.translation.x || 0, gesture.translation.y || 0)
    .rotate(gesture?.rotation || 0)
    .scale(gesture.scale || 1)
    .translate(-origin.x, -origin.y)
}

function getOrigin(el: HTMLElement | SVGElement, gesture: ZoomerWheelGesture | ZoomerTouchGesture) {
  if (el instanceof HTMLElement) {
    const rect = el.getBoundingClientRect()
    return {
      x: gesture.origin.x - rect.x,
      y: gesture.origin.y - rect.y,
    }
  }

  if (el instanceof SVGElement) {
    const matrix = el.ownerSVGElement?.getScreenCTM()?.inverse()
    const pt = new DOMPoint(gesture.origin.x, gesture.origin.y)
    return pt.matrixTransform(matrix)
  }

  throw new Error("Expected HTML or SVG element")
}

function applyMatrix(el: HTMLElement | SVGElement, matrix: DOMMatrix) {
  if (el instanceof HTMLElement) {
    el.style.transform = matrix.toString()
    return
  }

  if (el instanceof SVGElement) {
    el.setAttribute("transform", matrix.toString())
    return
  }

  throw new Error("Expected HTML or SVG element")
}

function getDOMMatrix(): typeof DOMMatrix | typeof WebKitCSSMatrix {
  const Matrix = DOMMatrix ?? window.WebKitCSSMatrix

  if (!Matrix) {
    const error = new Error("Couldn't find a DOM Matrix implementation")
    console.error(error)
  }

  return Matrix
}

function applyPanZoom(listenFromElement: HTMLElement, applyToElement: HTMLElement | SVGElement) {
  const Matrix = zoomer.getDOMMatrix()
  if (!Matrix) return

  let origin: ZoomerWheelGesture["origin"]
  let initialMatrix = new Matrix(getComputedStyle(applyToElement).transform)
  applyToElement.style.transformOrigin = "0 0"

  return zoomer(listenFromElement, {
    onGestureStart(gesture) {
      applyToElement.style.transform = ""
      origin = zoomer.getOrigin(applyToElement, gesture)
      const newMatrix = zoomer.gestureToMatrix(gesture, origin).multiply(initialMatrix)
      zoomer.applyMatrix(applyToElement, newMatrix)
    },
    onGestureChange(gesture) {
      const newMatrix = zoomer.gestureToMatrix(gesture, origin).multiply(initialMatrix)
      zoomer.applyMatrix(applyToElement, newMatrix)
    },
    onGestureEnd(gesture) {
      const newMatrix = zoomer.gestureToMatrix(gesture, origin).multiply(initialMatrix)
      const scaleChanged = initialMatrix.scale !== newMatrix.scale
      if (scaleChanged) zoomer.applyMatrix(applyToElement, initialMatrix)
      initialMatrix = newMatrix
    },
  })
}

zoomer.gestureToMatrix = gestureToMatrix
zoomer.getOrigin = getOrigin
zoomer.applyMatrix = applyMatrix
zoomer.getDOMMatrix = getDOMMatrix
zoomer.applyPanZoom = applyPanZoom

export default zoomer
