import Button from './Button'
import { Meta, Story } from '@storybook/react'

export default {
  title: 'Components/UI/Button',
} as Meta<any>

const Template: Story<any> = (args) => <Button {...args} />

export const MyButton = Template.bind({})
MyButton.storyName = 'h1'
MyButton.args = {
  type: 'h1',
}
