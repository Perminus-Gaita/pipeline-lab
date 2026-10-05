"use client";

import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import { TodoForm } from "@/components/todo-form";

export default function Home() {
  return (
    <main className="mx-auto flex max-w-md flex-col gap-6 p-8">
      <div className="flex gap-2">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="danger" disabled>Danger</Button>
      </div>
      <div className="flex gap-2">
        <Badge>Neutral</Badge>
        <Badge tone="success">Done</Badge>
        <Badge tone="warning">Pending</Badge>
      </div>
      <TodoForm onAdd={(t) => console.log("added", t)} />
    </main>
  );
}