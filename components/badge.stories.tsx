import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Badge } from "./badge";

const meta = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    tone: {
      control: "radio",
      options: ["neutral", "success", "warning"],
    },
    children: { control: "text" },
  },
  args: {
    children: "Badge",
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = {
  args: { tone: "neutral", children: "Draft" },
};

export const Success: Story = {
  args: { tone: "success", children: "Active" },
};

export const Warning: Story = {
  args: { tone: "warning", children: "Pending" },
};

export const DefaultTone: Story = {
  args: { children: "No tone passed" },
};

export const LongLabel: Story = {
  args: { tone: "warning", children: "Awaiting manual review" },
};

export const AllTones: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8 }}>
      <Badge tone="neutral">Neutral</Badge>
      <Badge tone="success">Success</Badge>
      <Badge tone="warning">Warning</Badge>
    </div>
  ),
};
