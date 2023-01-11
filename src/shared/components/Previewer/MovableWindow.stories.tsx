import { ComponentStory, ComponentMeta } from "@storybook/react"

import { MovableWindow } from "./MovableWindow"
import "styles/main.scss"

export default {
  title: "Shared/MovableWindow",
  component: MovableWindow,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof MovableWindow>

export const MovableWindow_: ComponentStory<typeof MovableWindow> = (args) => {
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
  title: "Untitled Window",
}
