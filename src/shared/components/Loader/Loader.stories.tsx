import { ComponentStory, ComponentMeta } from "@storybook/react"

import { Loader } from "./Loader"
import "styles/main.scss"

export default {
  title: "Shared/Loader",
  component: Loader,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Loader>

export const Loader_: ComponentStory<typeof Loader> = (args) => <Loader {...args} />
Loader_.args = {
  loading: true,
}
