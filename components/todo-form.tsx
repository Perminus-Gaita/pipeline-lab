"use client";

import { useState, type FormEvent } from "react";
import { Button } from "./button";

type Props = {
  onAdd: (title: string) => void;
};

export function TodoForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");

  function submit(e: FormEvent) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setTitle("");
  }

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input
        aria-label="Todo title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs doing?"
        className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900"
      />
      <Button type="submit">Add</Button>
    </form>
  );
}