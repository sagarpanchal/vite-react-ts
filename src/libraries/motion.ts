export function MotionDetector() {
  const alpha = 0.5
  const greyScale = false

  const video = document.getElementById("camStream") as HTMLVideoElement
  const canvas = document.getElementById("canvas") as HTMLCanvasElement
  const canvasFinal = document.getElementById("canvasFinal") as HTMLCanvasElement

  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
  const ctxFinal = canvasFinal.getContext("2d") as CanvasRenderingContext2D

  const imgDataPrev: any[] = []
  let localStream: MediaStream
  let imgData = null
  let version = 0

  function success(stream: MediaStream) {
    localStream = stream
    video.srcObject = stream
    video.play()
  }

  function handleError(error: any) {
    console.error(error)
  }

  function snapshot() {
    if (localStream) {
      canvas.width = video.offsetWidth
      canvas.height = video.offsetHeight
      canvasFinal.width = video.offsetWidth
      canvasFinal.height = video.offsetHeight

      ctx.drawImage(video, 0, 0)

      // Must capture image data in new instance as it is a live reference.
      // Use alternative live referneces to prevent messed up data.
      imgDataPrev[version] = ctx.getImageData(0, 0, canvas.width, canvas.height)
      version = version === 0 ? 1 : 0

      imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)

      const length = imgData.data.length
      let x = 0
      while (x < length) {
        if (!greyScale) {
          // Alpha blending formula: out = (alpha * new) + (1 - alpha) * old.
          imgData.data[x] = alpha * (255 - imgData.data[x]) + (1 - alpha) * imgDataPrev[version].data[x]
          imgData.data[x + 1] = alpha * (255 - imgData.data[x + 1]) + (1 - alpha) * imgDataPrev[version].data[x + 1]
          imgData.data[x + 2] = alpha * (255 - imgData.data[x + 2]) + (1 - alpha) * imgDataPrev[version].data[x + 2]
          imgData.data[x + 3] = 255
        } else {
          // GreyScale.
          const av = (imgData.data[x] + imgData.data[x + 1] + imgData.data[x + 2]) / 3
          const av2 =
            (imgDataPrev[version].data[x] + imgDataPrev[version].data[x + 1] + imgDataPrev[version].data[x + 2]) / 3
          const blended = alpha * (255 - av) + (1 - alpha) * av2
          imgData.data[x] = blended
          imgData.data[x + 1] = blended
          imgData.data[x + 2] = blended
          imgData.data[x + 3] = 255
        }
        x += 4
      }
      ctxFinal.putImageData(imgData, 0, 0)
    }
  }

  function init() {
    if (navigator.getUserMedia) {
      navigator.getUserMedia({ video: true }, success, handleError)
    } else {
      console.error("Your browser does not support getUserMedia")
    }
    window.setInterval(snapshot, 32)
  }

  return {
    init,
  }
}
