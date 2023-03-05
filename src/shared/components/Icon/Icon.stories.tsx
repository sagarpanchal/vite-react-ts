import { StoryFn, Meta } from "@storybook/react"

import { FontIcon } from "./Icon"
import "styles/main.scss"

export default {
  title: "Shared/FontIcon",
  component: FontIcon,
  parameters: {
    layout: "centered",
  },
} as Meta<typeof FontIcon>

export const FontIcon_: StoryFn<typeof FontIcon> = (args) => <FontIcon {...args} />
FontIcon_.args = {
  type: "pencil",
}
