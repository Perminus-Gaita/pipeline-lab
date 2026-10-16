"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import { TodoForm } from "@/components/todo-form";
import type { Todo } from "@/lib/todos-store";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/todos")
      .then((res) => res.json())
      .then((data: { todos: Todo[] }) => {
        // Merge instead of replace, so a todo added while this request
        // was still loading is not wiped out.
        setTodos((prev) => {
          const ids = new Set(data.todos.map((t) => t.id));
          return [...data.todos, ...prev.filter((t) => !ids.has(t.id))];
        });
      })
      .catch(() => setError("Could not load todos"));
  }, []);

  async function addTodo(title: string) {
    setError(null);
    const res = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    if (!res.ok) {
      setError("Could not add todo");
      return;
    }
    const data: { todo: Todo } = await res.json();
    setTodos((prev) => [...prev, data.todo]);
  }

  return (
    <main className="mx-auto flex w-full max-w-md flex-col gap-6 p-4 sm:p-8">
      <div className="flex flex-wrap gap-2">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="danger" disabled>Danger</Button>
      </div>
      <div className="flex flex-wrap gap-2">
        <Badge>Neutral</Badge>
        <Badge tone="success">Done</Badge>
        <Badge tone="warning">Pending</Badge>
      </div>

      <TodoForm onAdd={addTodo} />

      {error && (
        <p role="alert" className="text-sm text-red-700 dark:text-red-400">
          {error}
        </p>
      )}

      <ul aria-label="Todos" className="flex flex-col gap-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
          >
            {todo.title}
          </li>
        ))}
      </ul>
    </main>
  );
}