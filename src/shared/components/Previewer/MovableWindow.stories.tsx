import { StoryFn, Meta } from "@storybook/react"

import { MovableWindow } from "./MovableWindow"
import "styles/main.scss"

export default {
  title: "Shared/MovableWindow",
  component: MovableWindow,
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof MovableWindow>

export const MovableWindow_: StoryFn<typeof MovableWindow> = (args) => {
  return (
    <MovableWindow {...args}>
      <div style={{ width: "16rem" }}>
        This window will move if you drag the titlebar. This window will move if you drag the titlebar. This window will
        move if you drag the titlebar. This window will move if you drag the titlebar. This window will move if you drag
        the titlebar
      </div>
    </MovableWindow>
  )
}
MovableWindow_.args = {
  title: "Movable Window",
}
