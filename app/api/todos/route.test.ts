import { beforeEach, describe, expect, it } from "vitest";
import { resetTodos } from "../../../lib/todos-store";
import { GET, POST } from "./route";

function post(body: unknown) {
  return POST(
    new Request("http://localhost/api/todos", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: typeof body === "string" ? body : JSON.stringify(body),
    }),
  );
}

describe("/api/todos", () => {
  beforeEach(() => {
    resetTodos();
  });

  it("GET returns an empty list initially", async () => {
    const res = await GET();
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ todos: [] });
  });

  it("POST creates a todo and returns 201", async () => {
    const res = await post({ title: "Write tests" });
    expect(res.status).toBe(201);
    const { todo } = await res.json();
    expect(todo).toMatchObject({ title: "Write tests", done: false });
    expect(typeof todo.id).toBe("string");
  });

  it("POST trims the title", async () => {
    const res = await post({ title: "  padded  " });
    const { todo } = await res.json();
    expect(todo.title).toBe("padded");
  });

  it("GET returns created todos", async () => {
    await post({ title: "One" });
    await post({ title: "Two" });
    const { todos } = await (await GET()).json();
    expect(todos.map((t: { title: string }) => t.title)).toEqual(["One", "Two"]);
  });

  it.each([
    ["empty title", { title: "" }],
    ["whitespace title", { title: "   " }],
    ["missing title", {}],
    ["non-string title", { title: 42 }],
  ])("POST rejects %s with 400", async (_name, body) => {
    const res = await post(body);
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "Title is required" });
  });

  it("POST rejects invalid JSON with 400", async () => {
    const res = await post("{not json");
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "Invalid JSON" });
  });
});
