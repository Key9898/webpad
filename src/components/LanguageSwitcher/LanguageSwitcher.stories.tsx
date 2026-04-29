import type { Meta, StoryObj } from '@storybook/react'
import LanguageSwitcher from './LanguageSwitcher'

const meta: Meta<typeof LanguageSwitcher> = {
  title: 'UI/LanguageSwitcher',
  component: LanguageSwitcher,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof LanguageSwitcher>

export const Default: Story = {
  args: {},
}

export const InHeader: Story = {
  decorators: [
    (Story) => (
      <div className="flex items-center gap-4 p-4 bg-white border-b border-gray-200">
        <span className="text-xl font-bold text-primary-600">WebPad</span>
        <Story />
      </div>
    ),
  ],
}
