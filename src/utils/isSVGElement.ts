export function isSVGElement(input: unknown): input is SVGElement {
  return input instanceof SVGElement
}
