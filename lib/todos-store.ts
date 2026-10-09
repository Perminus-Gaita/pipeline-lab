export type Todo = {
  id: string;
  title: string;
  done: boolean;
};

let todos: Todo[] = [];

export function listTodos(): Todo[] {
  return todos;
}

export function addTodo(title: string): Todo {
  const todo: Todo = { id: crypto.randomUUID(), title, done: false };
  todos = [...todos, todo];
  return todo;
}

export function resetTodos(): void {
  todos = [];
}
