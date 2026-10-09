import { addTodo, listTodos } from "../../../lib/todos-store";

export async function GET() {
  return Response.json({ todos: listTodos() });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const title =
    typeof body === "object" && body !== null && "title" in body
      ? (body as { title: unknown }).title
      : undefined;

  if (typeof title !== "string" || title.trim() === "") {
    return Response.json(
      { error: "Title is required" },
      { status: 400 },
    );
  }

  const todo = addTodo(title.trim());
  return Response.json({ todo }, { status: 201 });
}
