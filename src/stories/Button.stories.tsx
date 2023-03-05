import { StoryFn, Meta } from "@storybook/react"

import { Button } from "./Button"
import "styles/main.scss"

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/Button",
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    variant: {
      control: {
        type: "select",
        options: ["primary", "secondary", "success", "danger", "warning", "info"],
      },
    },
    size: {
      control: {
        type: "select",
        options: ["sm", "md", "lg"],
      },
    },
  },
  parameters: {
    layout: "centered",
  },
} as Meta<typeof Button>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Example_: StoryFn<typeof Button> = (args) => <Button {...args} />
Example_.args = {
  variant: "primary",
  outlined: false,
  size: "md",
  label: "Example",
}
