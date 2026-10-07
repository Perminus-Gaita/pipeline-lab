import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent } from "storybook/test";
import { TodoForm } from "./todo-form";

const meta = {
  title: "Components/TodoForm",
  component: TodoForm,
  tags: ["autodocs"],
  args: {
    onAdd: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 420 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TodoForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AddsTodoOnSubmit: Story = {
  play: async ({ args, canvas }) => {
    const input = canvas.getByLabelText("Todo title");

    await userEvent.type(input, "Write the stories");
    await userEvent.click(canvas.getByRole("button", { name: "Add" }));

    await expect(args.onAdd).toHaveBeenCalledWith("Write the stories");
    await expect(input).toHaveValue("");
  },
};

export const AddsOnEnterKey: Story = {
  play: async ({ args, canvas }) => {
    const input = canvas.getByLabelText("Todo title");

    await userEvent.type(input, "Press enter{enter}");

    await expect(args.onAdd).toHaveBeenCalledWith("Press enter");
    await expect(input).toHaveValue("");
  },
};

export const TrimsWhitespace: Story = {
  play: async ({ args, canvas }) => {
    await userEvent.type(canvas.getByLabelText("Todo title"), "   padded title   ");
    await userEvent.click(canvas.getByRole("button", { name: "Add" }));

    await expect(args.onAdd).toHaveBeenCalledWith("padded title");
  },
};

export const IgnoresEmptySubmit: Story = {
  play: async ({ args, canvas }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Add" }));

    await expect(args.onAdd).not.toHaveBeenCalled();
  },
};

export const IgnoresWhitespaceOnly: Story = {
  play: async ({ args, canvas }) => {
    await userEvent.type(canvas.getByLabelText("Todo title"), "     ");
    await userEvent.click(canvas.getByRole("button", { name: "Add" }));

    await expect(args.onAdd).not.toHaveBeenCalled();
  },
};