/** Narrow DOM helpers — avoids multi-root TS conflicts with React's `Element` type */

export function getBoundingRect(node: EventTarget): {
  left: number
  top: number
  width: number
  height: number
} {
  return (
    node as unknown as {
      getBoundingClientRect: () => {
        left: number
        top: number
        width: number
        height: number
      }
    }
  ).getBoundingClientRect()
}
