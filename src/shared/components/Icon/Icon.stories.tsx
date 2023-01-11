import { ComponentStory, ComponentMeta } from "@storybook/react"

import { FontIcon } from "./Icon"
import "styles/main.scss"

export default {
  title: "Shared/FontIcon",
  component: FontIcon,
  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof FontIcon>

export const FontIcon_: ComponentStory<typeof FontIcon> = (args) => <FontIcon {...args} />
FontIcon_.args = {
  type: "pencil",
}
