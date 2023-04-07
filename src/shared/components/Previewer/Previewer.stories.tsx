import { StoryFn, Meta } from "@storybook/react"

import { MovableWindow } from "./MovableWindow"
import { Previewer } from "./Previewer"

import "styles/main.scss"

export default {
  title: "Shared/Previewer",
  component: Previewer,
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof Previewer>

export const Previewer_: StoryFn<typeof Previewer> = (args) => (
  <Previewer {...args}>
    <MovableWindow title="Movable Window">
      <div style={{ width: "16rem" }}>
        MovableWindow component is passed inside Previewer as child. MovableWindow component is passed inside Previewer
        as child. MovableWindow component is passed inside Previewer as child. MovableWindow component is passed inside
        Previewer as child. MovableWindow component is passed inside Previewer as child.
      </div>
    </MovableWindow>
  </Previewer>
)

Previewer_.args = {
  initialScale: 1,
}
