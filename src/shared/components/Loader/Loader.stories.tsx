import { StoryFn, Meta } from "@storybook/react"

import { Loader } from "./Loader"
import "styles/main.scss"

export default {
  title: "Shared/Loader",
  component: Loader,
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof Loader>

export const Loader_: StoryFn<typeof Loader> = (args) => <Loader {...args} />
Loader_.args = {
  loading: true,
}
