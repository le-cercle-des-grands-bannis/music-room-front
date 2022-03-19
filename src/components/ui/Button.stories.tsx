import Button from './Button'
import { Meta, Story } from '@storybook/react'

export default {
    title: 'Components/UI/Button',
} as Meta<any>

const Template: Story<any> = (args) => <Button {...args} />

export const H1 = Template.bind({})
H1.storyName = 'h1'
H1.args = {
    type: 'h1'
}
